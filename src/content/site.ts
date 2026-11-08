import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, durations, hours, the address, phone and
 * email are NOT here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
const LIGHT_HELP = 'Wrap a few words in *asterisks* to set them in the lighter, highlighted weight.';
const GROUP_PHOTO_HELP =
  'Shown beside this group of services (tall, 4:5). A “Sample” label stays on it until you replace it with a photo of your own work. Remove it to show the group without a photo.';
const GALLERY_PHOTO_HELP = 'A car you worked on, in portrait (4:5). Shown with a “Sample” label until you replace it. Remove a photo to show fewer.';
const GALLERY_CAPTION_HELP = 'What we see, then “·” and the service — for example “Black paint, swirl-free · Paint correction”. Optional.';

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the finish colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name in the header and footer, set in wide capitals. One short word reads best.',
          default: 'Facet',
          maxLength: 20,
          required: true,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide logo in white or a light colour on a transparent background — the header is dark. It replaces the name mark in the header.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Finish colour',
          help: 'Buttons, the booking calendar, the time-in-the-bay bars and small highlights. A deep, saturated colour — petrol, racing green, oxblood, navy — suits the design; white text must stay readable on it.',
          default: '#0b5d68',
          contrastWith: '#ffffff',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'expanded',
          options: [
            { value: 'expanded', label: 'Expanded', description: 'Wide and confident — the original design.' },
            { value: 'refined', label: 'Expanded, light', description: 'The same wide letters in a lighter weight.' },
            { value: 'standard', label: 'Standard', description: 'Normal width, clean and compact.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Facet Detail Studio — paint correction & ceramic coating in Denver',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'An indoor detailing studio in Denver: paint correction, ceramic coating, interior detailing and maintenance washes, one car at a time. See prices and book online.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen: the headline, the button and the main photo on the dark studio background.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Detailing studio · Denver, CO',
          maxLength: 60,
        },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: LIGHT_HELP,
          default: 'Every panel, *under the light.*',
          maxLength: 60,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'Washes, interior detailing, paint correction and ceramic coating in a fully lit indoor bay. One car at a time, and every panel checked under the light before you collect it.',
          maxLength: 240,
          rows: 3,
        },
        { type: 'text', id: 'hero.cta', label: 'Button', default: 'Book a detail', maxLength: 28, required: true },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo',
          help: 'Your own work under the bay lights works best: hands, the tool and the paint, with the lights reflected in it. Shown tall (4:5) at the right of the first screen and full width on phones.',
          default: {
            src: '/photos/hero-polish-1200.webp',
            alt: 'A detailer’s gloved hand guiding a polishing machine along the roof of a grey car, the bay’s long light bars reflected in the paint.',
            width: 1200,
            height: 1500,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'services',
      label: 'Services',
      description:
        'Service names, lengths and prices come from Services in this dashboard; the page groups them by the words in their names (full detail, wash, interior, polish or correction, ceramic or coating). Here: the words and photos around them.',
      fields: [
        { type: 'text', id: 'services.title', label: 'Title', help: LIGHT_HELP, default: 'Services & *prices*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'services.intro',
          label: 'Introduction',
          default:
            'Prices marked “from” are for a sedan or small SUV in good condition. For a larger vehicle or heavier work, we look over the car with you at drop-off and agree the final price before we start. The bar shows how long your car stays in the bay.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'longText',
          id: 'services.noteFull',
          label: 'Note under “Full details”',
          default: 'A full day in the bay, inside and out. Drop off at your appointment time; we call when it’s ready to collect.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'image',
          id: 'services.photoFull',
          label: 'Photo for “Full details”',
          help: GROUP_PHOTO_HELP,
          default: { src: '/photos/menu-full-800.webp', alt: 'The deep black hood and headlight of a car, reflecting trees like a mirror.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        {
          type: 'longText',
          id: 'services.noteWash',
          label: 'Note under “Wash & protect”',
          default: 'For cars already in good shape — and the best way to keep them there. Every two to four weeks is ideal.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'image',
          id: 'services.photoWash',
          label: 'Photo for “Wash & protect”',
          help: GROUP_PHOTO_HELP,
          default: { src: '/photos/menu-wash-800.webp', alt: 'A car’s front wheel and wing covered in thick snow foam during a pre-wash.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        {
          type: 'longText',
          id: 'services.noteInterior',
          label: 'Note under “Interior”',
          default: 'Please take out child seats and personal items before you arrive. Heavy pet hair or staining can add time — we’ll tell you before we start.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'image',
          id: 'services.photoInterior',
          label: 'Photo for “Interior”',
          help: GROUP_PHOTO_HELP,
          default: { src: '/photos/menu-interior-800.webp', alt: 'A spotless car interior: cream leather seats, a wood-trimmed centre console and the gear selector.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        {
          type: 'longText',
          id: 'services.noteCorrection',
          label: 'Note under “Paint correction”',
          default: 'We read the paint depth on every panel before polishing and show you a finished test section before we do the whole car.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'image',
          id: 'services.photoCorrection',
          label: 'Photo for “Paint correction”',
          help: GROUP_PHOTO_HELP,
          default: { src: '/photos/menu-correction-800.webp', alt: 'Hands guiding a dual-action polisher across a dark car hood, studio lights reflected in the paint.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        {
          type: 'longText',
          id: 'services.noteCoating',
          label: 'Note under “Ceramic coating”',
          default: 'A coating goes on corrected paint only — that’s why every coating includes a polish. Keep the car dry for a day after you collect it.',
          maxLength: 220,
          rows: 2,
        },
        {
          type: 'image',
          id: 'services.photoCoating',
          label: 'Photo for “Ceramic coating”',
          help: GROUP_PHOTO_HELP,
          default: { src: '/photos/menu-coating-800.webp', alt: 'Tight, round water beads standing on a dark coated surface.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'process',
      label: 'How we work',
      description: 'The steps every car goes through in the bay.',
      fields: [
        { type: 'text', id: 'process.title', label: 'Title', help: LIGHT_HELP, default: 'From drop-off *to handover*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'process.intro',
          label: 'Introduction',
          default: 'Whatever you book, the order never changes. Skipping a step is how swirls get made.',
          maxLength: 240,
          rows: 2,
        },
        {
          type: 'list',
          id: 'process.steps',
          label: 'Steps',
          itemLabel: 'Step',
          maxItems: 5,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 40, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 240, rows: 3 },
          ],
          default: [
            { title: 'Inspect', text: 'Under full-spectrum light, with a paint-depth gauge. You hear what we see before any work starts.' },
            { title: 'Decontaminate', text: 'Snow foam, a two-bucket wash, iron and tar removal, then clay. Polishing a dirty car only grinds the dirt in.' },
            { title: 'Correct', text: 'Machine polishing panel by panel, checked under the lights between passes. We stop where the clear coat says stop.' },
            { title: 'Protect & hand over', text: 'Sealant or ceramic coating, a last check under the lights, and a written care sheet to take home.' },
          ],
        },
      ],
    },
    {
      id: 'gallery',
      label: 'In the bay',
      description:
        'Your recent work: up to five photos. Each sample photo carries a “Sample” label until you replace it — always show cars you worked on yourself.',
      fields: [
        { type: 'text', id: 'gallery.title', label: 'Title', help: LIGHT_HELP, default: 'In the *bay*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'gallery.intro',
          label: 'Introduction',
          default: 'Recent work, close up and under the lights — paint, wheels, leather and cloth.',
          maxLength: 240,
          rows: 2,
        },
        {
          type: 'image',
          id: 'gallery.photo1',
          label: 'Photo 1 (wide)',
          help: 'The large, wide photo that opens the gallery (3:2). Shown with a “Sample” label until you replace it.',
          default: { src: '/photos/bay-gloss-1200.webp', alt: 'White paint and a black window surround, water droplets standing on a glossy finish with long studio light reflections.', width: 1200, height: 800 },
          aspectRatio: 3 / 2,
        },
        { type: 'text', id: 'gallery.caption1', label: 'Caption 1', help: GALLERY_CAPTION_HELP, default: 'White paint, beading after the coating · Ceramic coating', maxLength: 72 },
        {
          type: 'image',
          id: 'gallery.photo2',
          label: 'Photo 2',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/bay-wheel-800.webp', alt: 'A gloved hand working a soft detailing brush into a wet tyre and wheel.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption2', label: 'Caption 2', help: GALLERY_CAPTION_HELP, default: 'Wheels and tyres, brushed by hand · Maintenance wash', maxLength: 72 },
        {
          type: 'image',
          id: 'gallery.photo3',
          label: 'Photo 3',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/bay-leather-800.webp', alt: 'A black leather driver’s seat with blue stitching, clean and matte in low light.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption3', label: 'Caption 3', help: GALLERY_CAPTION_HELP, default: 'Black leather, cleaned and conditioned · Leather care', maxLength: 72 },
        {
          type: 'image',
          id: 'gallery.photo4',
          label: 'Photo 4',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/bay-extract-800.webp', alt: 'A hand drawing a hot-water extraction tool across a cloth car seat.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption4', label: 'Caption 4', help: GALLERY_CAPTION_HELP, default: 'Cloth seats, hot-water extraction · Interior detail', maxLength: 72 },
        {
          type: 'image',
          id: 'gallery.photo5',
          label: 'Photo 5',
          help: GALLERY_PHOTO_HELP,
          default: { src: '/photos/bay-polish-800.webp', alt: 'Two hands holding a polisher against the glossy black wing of a car.', width: 800, height: 1000 },
          aspectRatio: 4 / 5,
        },
        { type: 'text', id: 'gallery.caption5', label: 'Caption 5', help: GALLERY_CAPTION_HELP, default: 'Black paint, the finishing pass · Paint correction', maxLength: 72 },
        {
          type: 'text',
          id: 'gallery.linkLabel',
          label: 'Link text (optional)',
          help: 'For example “More on Instagram”. Leave empty to hide the link.',
          default: '',
          maxLength: 40,
        },
        { type: 'link', id: 'gallery.linkUrl', label: 'Link address', help: 'Your Instagram or portfolio page, starting with https://', default: '' },
      ],
    },
    {
      id: 'standards',
      label: 'Studio standards',
      description: 'What every car gets, whatever is booked.',
      fields: [
        { type: 'text', id: 'standards.title', label: 'Title', help: LIGHT_HELP, default: 'Studio *standards*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'standards.text',
          label: 'Text',
          default: 'A detail is only as good as the habits behind it. These don’t change with the price.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'standards.items',
          label: 'Standards',
          itemLabel: 'Standard',
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 240, rows: 3 },
          ],
          default: [
            { title: 'Indoors, under full light', text: 'Every car is worked on inside our lit bay — never in direct sun, never on the street.' },
            { title: 'Measured before polished', text: 'Paint depth is read on every panel first. Thin paint is left alone, and you’ll know why.' },
            { title: 'One car at a time', text: 'One bay, one car, from drop-off to collection. Your keys never sit in a pile.' },
            { title: 'A care sheet to take home', text: 'What we used, what was corrected and what wasn’t, and how to wash the car from here.' },
          ],
        },
      ],
    },
    {
      id: 'goodToKnow',
      label: 'Good to know',
      description: 'The practical questions clients ask before their first appointment.',
      fields: [
        { type: 'text', id: 'faq.title', label: 'Title', help: LIGHT_HELP, default: 'Good to *know*', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'faq.items',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'How long will you need my car?',
              answer:
                'The time shown for each service is the time your car spends in the bay. Drop off at your appointment time and collect the same day — full-day services start in the morning and are ready by early evening.',
            },
            {
              question: 'Can you remove every scratch?',
              answer:
                'Not always, and we’ll tell you before we start. If your fingernail catches in a scratch it has likely gone through the clear coat: polishing can soften it, but removing it would mean taking too much paint.',
            },
            {
              question: 'Do I need a ceramic coating?',
              answer:
                'Not necessarily. A coating keeps the gloss protected far longer than a wax or sealant and makes washing much easier — but a sealant twice a year is a good choice too. We’ll recommend honestly.',
            },
            {
              question: 'What should I do before drop-off?',
              answer:
                'Take out personal items and child seats, and tell us about any warning lights, wraps or paint protection film. There’s no need to wash the car first.',
            },
            {
              question: 'What if I need to change or cancel?',
              answer:
                'Let us know as soon as you can — at least 48 hours ahead for full-day services, so we can offer the bay to someone else.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: LIGHT_HELP, default: 'Book your *drop-off*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a service, then a drop-off time that suits you. No account needed — it takes about a minute.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: LIGHT_HELP, default: 'Find the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Drop-off & collection',
          default:
            'Drive up to the roller door of Bay 3 at your appointment time — we take the keys and walk round the car with you. There’s a small lounge with coffee and Wi-Fi if you’d rather wait for a shorter service. Collection is until closing time.',
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Paint correction, ceramic coating & interior detailing in Denver, Colorado.',
          maxLength: 100,
        },
      ],
    },
  ],
});
