import type { Preset } from '@profitstudio/booking-engine';

/**
 * Facet Detail Studio's own preset (INTEGRATION.md §5): the sample services,
 * hours and policies preview mode shows, and the starter set the dashboard
 * offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in US dollars, in cents.
 *
 * One bay, one car at a time: the engine keeps ONE shared calendar, so each
 * service's length is the time the car spends in the bay, and the buffer after
 * it is the bay's reset (rinse, towels, lights). The longest work (two-stage
 * correction, a ceramic coating) fits one studio day: it books the morning
 * slot and the car is collected that evening. Multi-day work, add-ons and
 * vehicle-size pricing need a new engine version — never custom code here.
 *
 * The website sorts services into groups (Full details, Wash & protect,
 * Interior, Paint correction, Ceramic coating) by the words in their names —
 * see src/lib/services.ts.
 */
export const sitePreset = {
  id: 'car-detailing',
  label: 'Car Detailing Studio',
  terminology: { customer: 'client', customers: 'clients', booking: 'appointment', bookings: 'appointments' },
  previewBusiness: {
    name: 'Sample Detail Studio',
    currency: 'USD',
    locale: 'en-US',
    contact: {
      email: 'hello@example.com',
      phone: '+1 720-555-0100',
      address: '100 Example Street, Denver, CO',
    },
  },
  policies: {
    slotIntervalMinutes: 30,
    minNoticeMinutes: 720,
    maxAdvanceDays: 90,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  // Tuesday to Saturday; closed Sunday and Monday.
  workingHours: [
    { weekday: 2, start: '08:00', end: '18:00' },
    { weekday: 3, start: '08:00', end: '18:00' },
    { weekday: 4, start: '08:00', end: '18:00' },
    { weekday: 5, start: '08:00', end: '18:00' },
    { weekday: 6, start: '08:00', end: '16:00' },
  ],
  services: [
    {
      name: 'Full Detail — Inside & Out',
      description:
        'Our most-booked day: a decontamination wash, a one-step gloss polish and sealant outside, and a complete interior detail inside.',
      durationMinutes: 360,
      bufferAfterMinutes: 30,
      priceCents: 49500,
      priceFrom: true,
    },
    {
      name: 'Maintenance Wash',
      description:
        'A careful hand wash for a car that is already looked after: snow-foam pre-wash, two-bucket contact wash, wheels and arches, towel dry, glass.',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 9500,
    },
    {
      name: 'Decon Wash & Sealant',
      description:
        'Iron fallout and tar removed, clay-barred smooth, then a durable sealant for months of easy washing and tight water beading.',
      durationMinutes: 180,
      bufferAfterMinutes: 30,
      priceCents: 24500,
    },
    {
      name: 'Interior Detail',
      description:
        'Vacuum, steam and hot-water extraction for seats and carpets, every surface cleaned and dressed to a matte factory finish, glass streak-free.',
      durationMinutes: 210,
      bufferAfterMinutes: 30,
      priceCents: 22500,
    },
    {
      name: 'Leather Clean & Condition',
      description: 'Seats and trim cleaned with a soft brush and a pH-neutral cleaner, then conditioned. No shine, no greasy feel.',
      durationMinutes: 90,
      bufferAfterMinutes: 30,
      priceCents: 14500,
    },
    {
      name: 'Gloss Enhancement — One-Step Polish',
      description:
        'A single machine-polishing stage that removes light swirls and haze and brings back depth. The right choice for most daily-driven cars.',
      durationMinutes: 300,
      bufferAfterMinutes: 30,
      priceCents: 45000,
      priceFrom: true,
    },
    {
      name: 'Two-Stage Paint Correction',
      description:
        'A cutting stage for deeper swirls and marring, then a refining polish. Paint depth is measured first; we never cut through clear coat for a deeper scratch.',
      durationMinutes: 480,
      bufferAfterMinutes: 30,
      priceCents: 85000,
      priceFrom: true,
    },
    {
      name: 'Ceramic Coating with One-Step Polish',
      description:
        'Decon wash and a one-step polish, then a professional ceramic coating on paint, wheel faces and glass, cured in the bay before you collect.',
      durationMinutes: 450,
      bufferAfterMinutes: 30,
      priceCents: 115000,
      priceFrom: true,
    },
    {
      name: 'Coating Maintenance Wash',
      description: 'For coated cars: a gentle wash, decontamination and a silica topper that keeps the coating slick and beading.',
      durationMinutes: 120,
      bufferAfterMinutes: 30,
      priceCents: 14500,
    },
  ],
} satisfies Preset;
