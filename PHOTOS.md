# Photographs

Eleven free photographs from Pexels, downloaded into the project (never hot-linked),
cropped for their one use and exported as AVIF + WebP at three widths by the
Clearcoat photo pipeline. **This starter ships only those processed frames** — the
original downloads and the pipeline script stay with the source project, so the
repository never redistributes an unaltered copy. No image-generation tool was
used.

They are the website's **defaults** (`src/content/site.ts`): the owner replaces
each one in the dashboard (Website). **They are sample imagery, not Facet Detail
Studio** (a fictional studio): nobody in them works at or visited the studio, the
cars were not detailed there, and nobody is named. On the page every services photo
and every recent-work photo carries a **"Sample"** label until the owner replaces
that photo, and the recent-work section says "Stock images stand in until the
studio adds its own work." No faces appear: the work shots show hands and forearms
only (in the hero, the detailer's soft reflection in the door glass is blurred further
so nobody can be recognised). Photos with visible product labels, other businesses' signage or a car
maker's own promotional imagery were rejected (see below).

| Use (content field) | Files (`public/photos/`) | Source page | Photographer | Licence |
|---|---|---|---|---|
| Hero — a gloved hand guiding a dual-action polisher along a grey car's roof, the bay's light bars reflected in the paint (`hero.photo`) | `hero-polish-{800,1200,1600}` | https://www.pexels.com/photo/man-polishing-a-car-roof-14615257/ | Dextar Studio ([@dextarstudio](https://www.pexels.com/@dextarstudio/)) | Pexels License |
| Services, Full details — a deep black hood and headlight reflecting trees (`services.photoFull`) | `menu-full-{480,800,1200}` | https://www.pexels.com/photo/sleek-car-hood-with-reflective-surface-and-trees-38827316/ | Rosy Fields ([@rosyfields](https://www.pexels.com/@rosyfields/)) | Pexels License |
| Services, Wash & protect — a wheel and wing under snow foam (`services.photoWash`) | `menu-wash-{480,800,1200}` | https://www.pexels.com/photo/close-up-of-a-car-being-washed-with-soap-foam-37112139/ | SHOX ART ([@shox](https://www.pexels.com/@shox/)) | Pexels License |
| Services, Interior — cream leather and a wood-trimmed console (`services.photoInterior`) | `menu-interior-{480,800,1200}` | https://www.pexels.com/photo/a-stick-shift-beside-a-dial-of-a-luxury-car-interior-12175729/ | Ivan Kazlouski ([@ivan-kazlouski-234108500](https://www.pexels.com/@ivan-kazlouski-234108500/)) | Pexels License |
| Services, Paint correction — hands guiding a polisher across a dark hood (`services.photoCorrection`) | `menu-correction-{480,800,1200}` | https://www.pexels.com/photo/a-person-polishing-the-black-car-5233259/ | Khunkorn Laowisit ([@khunkorn-laowisit-1359149](https://www.pexels.com/@khunkorn-laowisit-1359149/)) | Pexels License |
| Services, Ceramic coating — water beads on a dark surface (`services.photoCoating`) | `menu-coating-{480,800,1200}` | https://www.pexels.com/photo/water-droplets-on-black-surface-9668906/ | Алексей ([@89382195](https://www.pexels.com/@89382195/)) | Pexels License |
| In the bay 1 (wide) — white paint with droplets and light reflections (`gallery.photo1`) | `bay-gloss-{800,1200,1600}` | https://www.pexels.com/photo/water-droplets-on-a-white-car-6873177/ | Tima Miroshnichenko ([@tima-miroshnichenko](https://www.pexels.com/@tima-miroshnichenko/)) | Pexels License |
| In the bay 2 — a detailing brush on a wet tyre and wheel (`gallery.photo2`) | `bay-wheel-{480,800,1200}` | https://www.pexels.com/photo/a-close-up-shot-of-a-person-brushing-the-wheel-of-a-car-6872147/ | Tima Miroshnichenko ([@tima-miroshnichenko](https://www.pexels.com/@tima-miroshnichenko/)) | Pexels License |
| In the bay 3 — a black leather seat in low light (`gallery.photo3`) | `bay-leather-{480,800,1200}` | https://www.pexels.com/photo/leather-seats-in-a-car-interior-18198200/ | Александр Лич ([@lich](https://www.pexels.com/@lich/)) | Pexels License |
| In the bay 4 — hot-water extraction on a cloth seat (`gallery.photo4`) | `bay-extract-{480,800,1200}` | https://www.pexels.com/photo/a-person-deep-cleaning-a-car-seat-5233285/ | Khunkorn Laowisit ([@khunkorn-laowisit-1359149](https://www.pexels.com/@khunkorn-laowisit-1359149/)) | Pexels License |
| In the bay 5 — a polisher on a glossy black wing (`gallery.photo5`) | `bay-polish-{480,800,1200}` | https://www.pexels.com/photo/a-person-buffing-a-car-6870296/ | Gustavo Fring ([@gustavo-fring](https://www.pexels.com/@gustavo-fring/)) | Pexels License |

Licences were checked on each photo's page on 8 November 2026 (each page reads
"Free to use"; licence: Pexels). The Pexels License does not require attribution;
it is recorded here anyway.

**Considered and rejected** (from ≈ 120 candidates):
- a coating applicator photo with a coating brand's bottle label in focus (Pexels 20051453);
- detailing-bay photos with another business's name on the wall (10463764, 31332624) or on a shirt (29504462);
- a car silhouette in a dark studio published by the car maker's own account (20790476) —
  a manufacturer's promotional image could imply endorsement;
- snow-foam and polishing shots with product labels, logos or camouflage wraps in frame
  (6872591, 14615262, 7154632–7154638), and a recognisable SUV grille shot (29566876);
- anything with a visible face.

**Hero (refinement pass).** The first hero, a water-beaded hood under light bars
(Pexels 29909550, Kağan Karatay), was replaced with a photo of the work itself. Of
≈ 40 detailer-at-work candidates, rejected: polishers or shirts with legible brand names
(Shine Systems on 28571826, Krauss on 37809566, a coating brand's shirt on 20042052 /
20042054 / 20051458), a printed bandana (11139239), a door badge (14615261), front-on faces
(37809563, 37809564, the 378095xx garage series), and garage or repair-shop settings
(35149468–70). 14615257 was chosen: a gloved hand and a dual-action polisher in a clean,
long indoor bay, with the bay's light bars running through the paint — the site's own
"light line" motif in a real photo.

## Processing

Each original was downloaded at 2400 px (Pexels' own resize), cropped to its frame,
converted to sRGB with metadata stripped, and exported as AVIF (q52) and WebP (q78).
No colour grade. One photo is retouched, and only to remove details, never to change the
work shown: in the hero, the polisher's maker label and the detailer's reflected face are
softened with a feathered blur until neither can be read (the `retouch` boxes in the
pipeline). The hero is cropped from the full-size original. 3.6 MB in all.

| Photo | Crop (from the original) | Widths |
|---|---|---|
| hero-polish | 4:5 from the landscape original, from 36 % across (the gloved hand, the polisher and the light bars in the paint; the detailer's face is outside the frame) | 800, 1200, 1600 |
| menu-full | 4:5, full width, from 10 % down | 480, 800, 1200 |
| menu-wash | 4:5 from the landscape original, from 20 % across | 480, 800, 1200 |
| menu-interior | 4:5, full width, from 12 % down | 480, 800, 1200 |
| menu-correction | 4:5 from the landscape original, from 47 % across (hands and pad) | 480, 800, 1200 |
| menu-coating | 4:5 from the landscape original, from 30 % across | 480, 800, 1200 |
| bay-gloss | 3:2, the whole frame | 800, 1200, 1600 |
| bay-wheel, bay-leather, bay-extract, bay-polish | 4:5 from the landscape originals (10 %, 2 %, 30 %, 15 % across) | 480, 800, 1200 |

The site's `<Photo>` component serves `<picture>` with AVIF then WebP sources from
`src/content/photoVariants.ts` (generated); the hero's AVIF is preloaded in `index.html`.
Owner uploads arrive resized by the engine and render as one `<img>`.

## Replacing a photo

In the dashboard → Website, each photo field shows its expected shape (4:5 for the hero,
the service groups and the recent-work portraits; 3:2 for the first, wide recent-work
photo). The page crops with `object-fit: cover`, so any upload fits; keep the subject near
the centre. Replacing a photo removes its "Sample" label.
