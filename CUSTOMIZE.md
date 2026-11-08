# Make this starter yours — the Claude Code prompt

Fill in the four lines at the top, then paste the whole prompt into a Claude
Code session opened in this folder. It changes identity and words only, so it
finishes in one short session.

```text
Customize this car detailing studio starter for my business.

Business name: <YOUR BUSINESS NAME>
City and area: <CITY, AREA>
Time zone (IANA): <e.g. America/Chicago>
Personality, in a few words: <e.g. precise and understated, or bold and high-gloss>

Follow CLAUDE.md (already loaded in this session — no need to open it again).
Open and change only these files; don't explore the rest of the project:
1. src/site.config.ts — name, timezone, and fictional previewContact details in my city.
2. index.html and admin/index.html — the business name, city and description in
   <title>, the meta description and the og tags.
3. src/content/site.ts — rewrite every DEFAULT text for my business: the name mark
   (brand.wordmark — one short word, set in wide capitals), the line above the
   headline, headline, introduction, the services intro and group notes, the process
   steps, the work captions, the standards, Good to know answers, the drop-off note
   and the search title and description. Keep field ids, types, limits and photos.
   Keep the sample photos (they stay labelled "Sample" until I upload my own work).
   Headlines may set one or two words in *asterisks* (shown in a light weight in the
   finish colour) — keep that style.
4. Only if the petrol finish colour clearly doesn't fit my personality (otherwise skip
   this step and don't open these files): change the default of brand.accent in
   src/content/site.ts (a deep, saturated colour — racing green, oxblood, navy, graphite
   blue), the light-mode colour in src/admin-theme.css and the light bar tint in
   public/favicon.svg, keeping white text at 4.5:1 on it.

Do not change the layout, the booking flow, src/lib/engine.ts, src/lib/preset.ts,
src/lib/services.ts, src/demo/, supabase/, booking-engine.lock.json or package.json.
Do not invent services, prices, opening hours, awards, reviews, staff, certifications,
product brands, warranties or coating lifetimes you cannot know — services, prices and
hours are set in the dashboard. When done, run npm run build and fix any error, then
show me the result with npm run dev.
```

## After the prompt

- **Your services:** dashboard → Services. The page puts each service in a group by the
  words in its name — *full detail / signature / inside & out*, *ceramic / coating /
  graphene / PPF*, *correction / polish / enhancement / swirl / scratch*, *interior /
  cabin / leather / seats / carpets / odour / steam*, *wash / decon / clay / sealant /
  wax / wheels / exterior* (in that order). If you rename a service to something without
  those words ("The Deep Cut"), its description decides instead, so keep the description
  describing the work. Anything else (window tint, headlight restoration) appears under
  "More services". The length you set is the time the car stays in the bay; the bar
  beside each service is drawn from it.
- **Your photos:** dashboard → Website → Services (one photo per group) and In the bay
  (up to five photos with captions, "What · Service"). Remove a photo to show fewer.
  Each stays labelled "Sample" until you replace it; show only cars you worked on.
- Connect real bookings: README.md, step 3.
