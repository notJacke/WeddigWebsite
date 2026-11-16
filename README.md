# Wedding website

An Expo Router and React Native Web site, pre-rendered to static HTML, with RSVPs stored in Supabase.

## Run it

```bash
npm install
npm run web
```

The site works without Supabase, but the RSVP form says it is not connected and saves nothing.

## Change the content

| What | Where |
| --- | --- |
| All wording, the date, times, addresses, hotels, dress code | `src/content/wedding.ts` |
| Photos | `src/content/photos.ts` and `assets/photos/` |
| Social-sharing image | `public/og-image.jpg` (1200 x 630) |

Anything wrapped in `tbc('...')` is a placeholder and shows with a dotted gold underline. Replace the whole `tbc('...')` with a plain string to confirm it. Set `date.iso` to start the countdown.

`npm run check:content` lists every placeholder that is left.

Before launch, set `site.previewMode` to `false`. That removes the underlines, the "sample" tags and the preview note. Set `site.allowSearchEngines` to `false` if you would rather keep the site out of search results.

## Connect Supabase

1. Create a project at [supabase.com](https://supabase.com). Choose an EU region, since guests' dietary details are personal data.
2. Create the database tables:
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```
3. Copy `.env.example` to `.env.local` and fill it in from Project Settings > API.

The website only ever gets the publishable (anon) key. That key can call `submit_rsvp()` and nothing else: it cannot read, change or delete replies. Never give the service role key an `EXPO_PUBLIC_` prefix.

## See the replies

In the Supabase Table Editor:

| View | Shows |
| --- | --- |
| `rsvp_summary` | Replies attending, replies declined, total guests |
| `rsvp_attending` | Who is coming, with their party |
| `rsvp_declined` | Who cannot come |
| `rsvp_dietary` | Food preferences and allergies |

`npm run export:rsvps` writes everything to `rsvps.csv`, ready for Excel. It needs `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

Each email address can reply once. To change a reply, edit or delete its row in the `rsvps` table.

## Publish

```bash
npm run build
```

Upload the `dist` folder to a static host that serves clean URLs, such as Netlify, Vercel or Cloudflare Pages. Set the `EXPO_PUBLIC_` values in `.env.local` before building, including `EXPO_PUBLIC_SITE_URL`, which social-sharing links depend on.

## Test locally with Supabase

With Docker running, `npx supabase start` runs a private copy of the database, and `npx supabase status` prints its URL and keys.
