/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (services, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Facet Detail Studio',
  /** IANA time zone of the business. */
  timezone: 'America/Denver',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'studio@facet.example',
    phone: '+1 720-555-0142',
    address: '4120 Foundry Lane, Bay 3, Denver, CO 80216',
  },
};
