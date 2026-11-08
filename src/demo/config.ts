import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'car-detailing-clearcoat',
  preset: sitePreset,
  business: {
    name: 'Facet Detail Studio',
    timezone: 'America/Denver',
    email: 'studio@facet.example',
    phone: '+1 720-555-0142',
    address: '4120 Foundry Lane, Bay 3, Denver, CO 80216',
  },
  ownerEmail: 'owner@facet.example',
  referencePrefix: 'FD',
  sampleNotes: [
    'Black 2019 hatchback — swirls on the hood and roof, a light key scratch on the rear door.',
    'Dog hair in the back seats and the cargo area.',
    'White SUV, daily driver. Thinking about a coating after the polish — happy to talk it through.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Marcus Bell', email: 'marcus.bell@example.com', phone: '+1 720 555 0113' },
    { name: 'Elena Novak', email: 'elena.novak@example.com', phone: '+1 720 555 0126' },
    { name: 'Daniel Okoro', email: 'daniel.okoro@example.com', phone: '+1 720 555 0131' },
    { name: 'Sofia Lindqvist', email: 'sofia.l@example.com', phone: '+1 720 555 0148' },
    { name: 'Ryan Castillo', email: 'ryan.castillo@example.com', phone: '+1 720 555 0152' },
    { name: 'Hana Sato', email: 'hana.sato@example.com', phone: '+1 720 555 0167' },
    { name: 'Owen Gallagher', email: 'owen.g@example.com', phone: '+1 720 555 0174' },
    { name: 'Priya Raman', email: 'priya.raman@example.com', phone: '+1 720 555 0189' },
    { name: 'Theo Marchetti', email: 'theo.m@example.com', phone: '+1 720 555 0193' },
    { name: 'Grace Whitfield', email: 'grace.w@example.com', phone: '+1 720 555 0108' },
  ],
};
