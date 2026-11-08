# Clearcoat — the visual system

**Idea:** a car under studio light. A detailing bay is a dark room lit by long
white light bars, and every panel shows those bars back as clean reflections —
that is how a detailer reads paint. The site works the same way: graphite
surfaces for the bay (header, first screen, process, recent work, booking band,
footer), cool studio-grey pages for reading, and thin **light lines** — the
reflections — as the one ornament. Type is wide and engineered, never "racing":
no italics, no speed graphics, no chrome. One owner colour, the **finish**
(petrol by default), marks every action and every measurement.

Every raw value lives in `src/styles/tokens.css`. Other stylesheets use the tokens only.

## Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--accent` (owner: *Finish colour*) | `#0b5d68` petrol | Buttons on light pages, links, calendar selection, time-in-the-bay bars, section numbers | white on it 7.6:1 (the editor checks any new colour against `#ffffff` at 4.5:1); on the page 6.6:1 |
| `--accent-glow` | 38 % finish in near-white | Light-weight headline words, numerals and bars on graphite | ≈ 11:1 on graphite |
| `--forest` (the bay) | `#0c0f11` graphite | Header, hero, process, recent work, booking band, footer | `--on-forest` 16.9:1, `--on-forest-soft` 8.8:1, `--on-forest-faint` 5.3:1 |
| `--paper` | `#eef0f0` studio grey | The page | — |
| `--raised` | `#fbfbfb` white | Standards, inputs, the booking sheet, hovered rows | — |
| `--oat` | `#e3e7e8` steel | Good to know, the booking summary | muted text 5.3:1 |
| `--ink` / `--ink-soft` / `--muted` | `#0f1315` / `#2b3236` / `#535e64` | Text | 16.3 / 11.4 / 5.8:1 on the page |
| `--light` / `--light-glow` | white / pale cyan glow | The light lines (decorative only) | — |
| `--clay` | `#a3341b` | Errors only, always with words | — |

The highlighted headline words are the finish colour on light pages and the lit
finish (`--accent-glow`) on graphite, so any deep colour the owner chooses keeps
working. Measured (rendered, Chromium, 1440 and 390 px): every text style on the
page and in the booking sheet is ≥ 5.3:1.

## Type

- **Mona Sans Variable** (OFL, width 75–125 %, weight 200–900), one family:
  - headlines at width **125 %** (expanded) and weight 620; the owner's `*highlight*`
    in the same width at weight 300 — the lit half of a panel, not an italic;
  - labels, buttons, service names and prices at 112–125 %, uppercase labels with
    0.18em tracking;
  - text at 100 %.
  Heading style (owner): *Expanded* (default), *Expanded, light*, *Standard* (normal width).
- The name mark: wide capitals, 0.32em tracking ("F A C E T").
- Numbers are tabular everywhere (prices, durations, section numbers, the calendar).

## Devices (each with a job)

- **The light line.** A hairline that fades in from both ends — a reflected light bar.
  Under the header once you scroll, along the foot of the booking sheet's header, between
  the two dark sections, above the footer, and above the hero's facts, where a brighter
  highlight sweeps along it once on load (a reflection moving across a panel). Reduced
  motion: no sweep.
- **The light-bar mark.** A short horizontal bar before every eyebrow (finish colour on
  light, white with a glow on graphite) and before today's row in the opening hours.
- **Time in the bay.** Every service row draws its engine duration as a thin bar on one
  shared scale (the longest service, rounded up to a whole hour) — a two-hour wash and an
  eight-hour correction compare at a glance; the exact length is printed beneath.
- **The viewer.** On wide screens a tall photo beside the service list follows the group
  you are reading (cross-fade, a slight settle). On narrower screens each group shows its
  photo as a wide strip instead.
- **Process bars.** Each step sits under a light bar that switches on as it scrolls into
  view (CSS scroll timelines where supported; lit by default elsewhere).
- **Section numbers** 01–06 in wide tabular numerals with a hairline.

## Layout and rhythm

- Page max 84rem with a fluid gutter (20–80 px). Sections breathe at 72–136 px.
- **Light / dark rhythm:** bay (hero) → grey (services) → bay (process + recent work, one
  long dark chapter split by a light line) → white (standards) → steel (Good to know) →
  bay (booking band) → grey (visit) → bay (footer).
- **Hero:** text on graphite at the left, the photo running to the right edge and melting
  into the graphite on its left and bottom (a soft fade at its top joins the header); the
  default photo shows the work itself — a gloved hand and a polisher, the bay's light bars
  reflected in the paint, the site's light line in a real photo; three engine facts (lowest price, range of
  time in the bay, today's real opening status) under the sweeping light line. Laptops
  ≤ 820 px high get a tighter rhythm so the facts stay on the first screen and clear of
  pinned corner controls. Phones: the photo first, full width, then the headline over its
  faded foot, a full-width Book button and the facts in two columns.
- **Services:** a sticky group bar (links with counts, `aria-current` on the group you are
  in), then rows: name and description | time-in-the-bay bar | price (a starting price
  carries a small "from" label above the amount, so amounts align) | Book. Phones: name
  and description, then bar · price · Book on one line.
- **Recent work:** one wide frame and four portraits in a three-column grid; a swipeable
  rail of equal frames on phones. Every stock photo is labelled **Sample**.
- **Standards:** a spec sheet — numbered rows, title and text in columns, the heading
  sticky beside it on wide screens.

## Shape and motion

Small radii (3 px controls, 6 px frames and the sheet) — machined, not soft. Buttons are
rectangles, never pills. Motion is slow and settled (`--ease-settle`), entrances rise 14 px,
the hero photo settles from 105 %. Everything honours `prefers-reduced-motion`.

## Booking sheet

The shared booking flow, restyled: a graphite header with the studio name, the title and a
light line along its foot; the summary on steel with a finish-colour rule; time chips and
calendar cells as small rectangles; the pinned Continue / submit bars keep the chosen time
and a focused field in view. Full screen on phones, a 66rem panel from the right from 960 px.

## Dashboard

The packaged `<BookingAdmin>` is not forked or restyled: `src/admin-theme.css` sets only its
accent — petrol `#0b5d68` with white text in Light, lit petrol `#8fd0d8` with graphite text
in Dark. The Website editor's sections follow the page: Brand, Search & sharing, Welcome,
Services (texts + one photo per group), How we work, In the bay, Studio standards, Good to
know, Booking, Visit, Footer.

## Accessibility

44 px tap targets, visible focus rings (white on graphite, finish colour on light), a skip
link, native `<details>` for Good to know, the sheet as a modal `<dialog>` (Esc, Back and ✕
close it; focus moves to the step heading), durations spoken in full for screen readers
("In the bay for 3 hours 30 minutes"), every decorative device `aria-hidden`.
