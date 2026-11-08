# Car Detailing Studio Booking Website — "Clearcoat" Starter

A finished, premium booking website for a car detailing studio, ready to make your
own with Claude Code and publish on Hostinger. It ships as **Facet Detail Studio**,
a fictional indoor detailing studio in Denver, Colorado:

- a one-page studio website — a dark "bay" first screen, services and prices in
  groups (Full details, Wash & protect, Interior, Paint correction, Ceramic coating)
  with each service's time in the bay drawn as a bar, how a car moves through the
  bay, recent work, the studio's standards, *Good to know* questions and drop-off
  details — that works from 320 px phones up, with booking in a sheet over the page;
- online booking — service, drop-off day and time, details and an emailed 6-digit code;
- the owner dashboard at `/admin/` — appointments, requests to confirm, services
  and prices, opening hours and closures, email health, and the website's own
  text, photos, finish colour and heading style.

The look — *Clearcoat*: a car under studio light. Graphite surfaces like a dark bay,
cool studio-grey pages, and the long white reflections of the bay's light bars drawn
as thin light lines; Mona Sans set expanded for headlines and normal for text; one
owner colour — the finish (petrol by default) — for actions, the calendar and the
time-in-the-bay bars.

Booking runs on [`@profitstudio/booking-engine`](https://www.npmjs.com/package/@profitstudio/booking-engine)
**2.0.0-beta.3** (pinned) with your own Supabase project and Resend for email.

## 1. Try it (no accounts needed)

```bash
npm install
npm run dev:demo   # the full Live Demo: book, then manage it at /admin/
npm run dev        # preview mode: the website with sample times, nothing saved
```

In the Live Demo everything stays in your browser — nothing is sent anywhere.

## 2. Make it yours with Claude Code

Open this folder in a Claude Code session and paste the prompt in
[`CUSTOMIZE.md`](CUSTOMIZE.md), filled in with your business. Claude edits a
short list of files (name, city, words, colours) — the booking system, the
dashboard and the layout stay as they are, so it is quick and cheap.

Services, prices, opening hours and contact details are **not** code: you set
them in the dashboard once the booking backend is connected. Photos of your own
work go in the dashboard → Website (Services photos, In the bay).

**One bay, one calendar.** The booking engine keeps one shared calendar, so each
service's length is the time a car spends in your bay, and the website shows only
drop-off times when the bay is free. Work longer than one opening day, add-ons and
vehicle-size pricing need a future engine version (quote larger vehicles at drop-off,
as the sample copy says).

## 3. Connect real bookings

You need a free Supabase project and a Resend account for booking emails.

```bash
cp .env.example .env.local    # your Supabase Project URL + Publishable key
npx supabase@2 login          # once, in your own terminal
npx booking-engine connect --admin you@example.com
```

`connect` links the project, sets up the database and the booking-email
function, and tells you exactly what is left for you to do (your dashboard
login and the two email secrets). Full steps: the Profit Studio guide *Build a
Premium Booking Website with Claude Code*, Step 3, or
`node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` §11.

Never put a Supabase **Secret** key or your Resend API key in `.env.local`, in a
prompt or in Hostinger — the Resend key lives only in Supabase's Edge Function
secrets.

## 4. Publish on Hostinger

Push this project to a private GitHub repository, then in Hostinger create a
**Web App** from it (Websites → Create site → Web App → Import Git Repository):

| Setting | Value |
|---|---|
| Framework | Vite |
| Build command | `npm run build` (never `build:demo`) |
| Output directory | `dist` |
| Node.js | 22 or newer |
| Environment variables | `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (public values only) |

`dist/` contains the website and `dist/admin/` the dashboard. Every push to
`main` redeploys.

## What is in this folder

| | |
|---|---|
| `src/site.config.ts` | The business name, time zone and preview contact details |
| `src/content/site.ts` | Everything the owner can edit in the dashboard → Website, with its default text and photos |
| `src/styles/tokens.css` | The design's colours, type and spacing (one file); `DESIGN.md` explains the system |
| `src/components/` | The website and its booking flow (`src/components/booking/`) |
| `src/lib/preset.ts` | The sample services and hours used by preview mode and offered in a new dashboard |
| `src/lib/services.ts` | How services find their group (by the words in their names) and the time-in-the-bay scale |
| `admin/` + `src/admin-main.tsx` | The packaged dashboard, mounted at `/admin/` |
| `src/demo/` | The Live Demo's in-browser engine and sample data — used only by `dev:demo` / `build:demo`; a normal build contains none of it |
| `supabase/` | The engine's database migrations and email function (managed by `npx booking-engine`; do not edit) |
| `CLAUDE.md`, `BOOKING_ENGINE.md` | Rules Claude Code follows in this project |
| `PHOTOS.md`, `ASSETS.md` | The Pexels photos (Pexels License), credited file by file |

## Commands

```bash
npm run dev          # preview mode (sample data) until .env.local exists — http://localhost:5177
npm run dev:demo     # the Live Demo (in-browser data, dashboard included)
npm run build        # production build → dist/
npm run build:demo   # the public Live Demo build → dist/ (never deploy this as your site)
npx booking-engine doctor             # checks versions, engine files and keys
npx booking-engine doctor --dist dist # after a build: also scans the output for secrets
```

## Licence

The code is MIT-licensed — see [`LICENSE`](LICENSE) (Copyright (c) 2026 Youssef
Es-salhi). Photographs and other third-party assets keep their own terms, listed
file by file in [`ASSETS.md`](ASSETS.md).
