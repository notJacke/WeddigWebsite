-- One reply can now cover at most two people: the person replying and, if they
-- tick the box, one more invited guest with their own dietary details.

alter table public.rsvps
  add column guest_dietary_requirements text check (char_length(guest_dietary_requirements) <= 2000),
  add column guest_food_preference text check (char_length(guest_food_preference) <= 200),
  add constraint at_most_two_people check (guest_count <= 2);

drop function public.submit_rsvp(uuid, text, text, boolean, integer, text[], text, text, text, text, text);

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
  p_special_information text default null,
  p_guest_dietary_requirements text default null,
  p_guest_food_preference text default null
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(btrim(p_email));
  v_with_guest boolean := p_attending and p_guest_count = 2;
begin
  if exists (select 1 from public.rsvps where submission_id = p_submission_id) then
    return 'ok';
  end if;

  if exists (select 1 from public.rsvps where lower(email) = v_email) then
    return 'already_responded';
  end if;

  insert into public.rsvps (
    submission_id, full_name, email, attending, guest_count, guest_names,
    dietary_requirements, food_preference, comments, song_request, special_information,
    guest_dietary_requirements, guest_food_preference
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
    nullif(btrim(p_special_information), ''),
    case when v_with_guest then nullif(btrim(p_guest_dietary_requirements), '') end,
    case when v_with_guest then nullif(btrim(p_guest_food_preference), '') end
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

revoke all on function public.submit_rsvp(uuid, text, text, boolean, integer, text[], text, text, text, text, text, text, text) from public;
grant execute on function public.submit_rsvp(uuid, text, text, boolean, integer, text[], text, text, text, text, text, text, text) to anon, authenticated;

-- New columns go at the end, which create or replace view allows.
create or replace view public.rsvp_attending with (security_invoker = true) as
  select full_name, email, guest_count, guest_names, food_preference,
         dietary_requirements, song_request, special_information, comments, created_at,
         guest_food_preference, guest_dietary_requirements
  from public.rsvps where attending order by created_at;

create or replace view public.rsvp_dietary with (security_invoker = true) as
  select full_name, guest_names, food_preference, dietary_requirements,
         guest_food_preference, guest_dietary_requirements
  from public.rsvps
  where attending and (
    dietary_requirements is not null or food_preference is not null
    or guest_dietary_requirements is not null or guest_food_preference is not null
  )
  order by full_name;

revoke all on public.rsvp_attending, public.rsvp_dietary from anon, authenticated;
