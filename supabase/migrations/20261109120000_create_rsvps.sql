-- RSVP storage for the wedding website.
--
-- Security model: the public website holds only the publishable (anon) key.
-- That key can do exactly one thing here: call public.submit_rsvp(). It cannot
-- read, update or delete the table or any of the reporting views.

create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  -- Generated once per form by the browser. Makes retries safe: if the network
  -- drops after the insert, the retry finds this id and reports success.
  submission_id uuid not null unique,
  full_name text not null check (char_length(btrim(full_name)) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  attending boolean not null,
  -- Total people covered by this response, including the person replying.
  guest_count integer not null check (guest_count between 0 and 20),
  -- Names of the additional guests (not including full_name).
  guest_names text[] not null default '{}' check (cardinality(guest_names) <= 19),
  dietary_requirements text check (char_length(dietary_requirements) <= 2000),
  food_preference text check (char_length(food_preference) <= 200),
  comments text check (char_length(comments) <= 4000),
  song_request text check (char_length(song_request) <= 300),
  special_information text check (char_length(special_information) <= 2000),
  created_at timestamptz not null default now(),
  constraint attending_guest_count check (
    (attending and guest_count >= 1) or (not attending and guest_count = 0)
  ),
  constraint guest_names_match_count check (
    (attending and cardinality(guest_names) = guest_count - 1)
    or (not attending and cardinality(guest_names) = 0)
  )
);

-- One response per email address, regardless of capitalisation.
create unique index rsvps_email_unique on public.rsvps (lower(email));
create index rsvps_attending_idx on public.rsvps (attending);

alter table public.rsvps enable row level security;
-- Deliberately no policies: direct table access is denied for anon and
-- authenticated. Writes go through submit_rsvp(); reading happens in the
-- Supabase dashboard or with the service role key (see scripts/export-rsvps.mjs).
revoke all on public.rsvps from anon, authenticated;

create function public.submit_rsvp(
  p_submission_id uuid,
  p_full_name text,
  p_email text,
  p_attending boolean,
  p_guest_count integer default 0,
  p_guest_names text[] default '{}',
  p_dietary_requirements text default null,
  p_food_preference text default null,
  p_comments text default null,
  p_song_request text default null,
  p_special_information text default null
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(btrim(p_email));
begin
  if exists (select 1 from public.rsvps where submission_id = p_submission_id) then
    return 'ok';
  end if;

  if exists (select 1 from public.rsvps where lower(email) = v_email) then
    return 'already_responded';
  end if;

  insert into public.rsvps (
    submission_id, full_name, email, attending, guest_count, guest_names,
    dietary_requirements, food_preference, comments, song_request, special_information
  ) values (
    p_submission_id,
    btrim(p_full_name),
    v_email,
    p_attending,
    case when p_attending then p_guest_count else 0 end,
    case when p_attending then coalesce(p_guest_names, '{}') else '{}' end,
    nullif(btrim(p_dietary_requirements), ''),
    nullif(btrim(p_food_preference), ''),
    nullif(btrim(p_comments), ''),
    nullif(btrim(p_song_request), ''),
    nullif(btrim(p_special_information), '')
  );

  return 'ok';
exception
  -- Two identical requests racing each other: the loser lands here.
  when unique_violation then
    if exists (select 1 from public.rsvps where submission_id = p_submission_id) then
      return 'ok';
    end if;
    return 'already_responded';
end;
$$;

revoke all on function public.submit_rsvp(uuid, text, text, boolean, integer, text[], text, text, text, text, text) from public;
grant execute on function public.submit_rsvp(uuid, text, text, boolean, integer, text[], text, text, text, text, text) to anon, authenticated;

-- Reporting views for the Supabase dashboard. They run with the caller's rights
-- and are not granted to the public roles.

create view public.rsvp_attending with (security_invoker = true) as
  select full_name, email, guest_count, guest_names, food_preference,
         dietary_requirements, song_request, special_information, comments, created_at
  from public.rsvps where attending order by created_at;

create view public.rsvp_declined with (security_invoker = true) as
  select full_name, email, comments, created_at
  from public.rsvps where not attending order by created_at;

create view public.rsvp_dietary with (security_invoker = true) as
  select full_name, guest_names, food_preference, dietary_requirements
  from public.rsvps
  where attending and (dietary_requirements is not null or food_preference is not null)
  order by full_name;

create view public.rsvp_summary with (security_invoker = true) as
  select
    count(*) filter (where attending) as responses_attending,
    count(*) filter (where not attending) as responses_declined,
    coalesce(sum(guest_count), 0) as total_guests
  from public.rsvps;

revoke all on public.rsvp_attending, public.rsvp_declined, public.rsvp_dietary, public.rsvp_summary from anon, authenticated;
