import { formatMoney } from '@profitstudio/booking-engine';
import type { Service } from '@profitstudio/booking-engine';

/**
 * The service list's groups.
 *
 * The engine (2.0.0-beta.3) has no service categories and no per-service
 * metadata, and a service's id is a database UUID this site cannot know when
 * it is built — so the group is read from the service's own engine data:
 *
 *   1. its NAME, against the rules below — the first rule that matches wins,
 *      strongest signal first ("Ceramic Coating with One-Step Polish" is a
 *      coating; "Coating Maintenance Wash" is a coating service too);
 *   2. if the name has no service words (an owner renamed "Two-Stage Paint
 *      Correction" to "The Deep Cut"), its DESCRIPTION, against the same rules —
 *      except that a description covering both inside and outside work
 *      (interior words with wash or polish words) is a full detail, whatever
 *      its first match;
 *   3. otherwise "More services" — a genuinely new kind of service (window
 *      tint, PPF) gets its own group instead of a wrong one.
 *
 * A truly stable category needs an engine field — see
 * docs/ENGINE-PROPOSAL-car-detailing.md in the Niche Pack workspace.
 */
export type GroupId = 'full' | 'coating' | 'correction' | 'interior' | 'wash' | 'more';

/** Content fields that belong to a group (src/content/site.ts). */
export type GroupNote = 'services.noteFull' | 'services.noteWash' | 'services.noteInterior' | 'services.noteCorrection' | 'services.noteCoating';
export type GroupPhoto = 'services.photoFull' | 'services.photoWash' | 'services.photoInterior' | 'services.photoCorrection' | 'services.photoCoating';

interface GroupRule {
  id: GroupId;
  label: string;
  note: GroupNote | null;
  photo: GroupPhoto | null;
  match: RegExp;
}

const RULES: GroupRule[] = [
  {
    id: 'full',
    label: 'Full details',
    note: 'services.noteFull',
    photo: 'services.photoFull',
    // Only phrases that mean the whole car: "Signature Interior" or "Interior Valet" stay interior.
    match: /\b(full detail|signature detail|complete detail|inside (?:and|&) out|interior (?:and|&) exterior|exterior (?:and|&) interior|showroom|full valet)\b/i,
  },
  {
    id: 'coating',
    label: 'Ceramic coating',
    note: 'services.noteCoating',
    photo: 'services.photoCoating',
    match: /\b(ceramic|coatings?|coated|graphene|ppf|protection film)\b/i,
  },
  {
    id: 'correction',
    label: 'Paint correction',
    note: 'services.noteCorrection',
    photo: 'services.photoCorrection',
    match: /\b(correction|polish(?:ing)?|enhancement|swirls?|scratch(?:es)?|compound|cut and polish)\b/i,
  },
  {
    id: 'interior',
    label: 'Interior',
    note: 'services.noteInterior',
    photo: 'services.photoInterior',
    match: /\b(interior|cabin|leather|upholstery|seats?|carpets?|odou?rs?|steam|extraction|headliner)\b/i,
  },
  {
    id: 'wash',
    label: 'Wash & protect',
    note: 'services.noteWash',
    photo: 'services.photoWash',
    match: /\b(wash(?:es)?|decon(?:tamination)?|clay|sealants?|wax(?:es)?|foam|exterior|wheels?|maintenance)\b/i,
  },
];

const MORE = { id: 'more', label: 'More services', note: null, photo: null } as const;

/** The order groups are shown in. */
const ORDER: GroupId[] = ['full', 'wash', 'interior', 'correction', 'coating', 'more'];

export interface Group {
  id: GroupId;
  label: string;
  note: GroupNote | null;
  photo: GroupPhoto | null;
  services: Service[];
}

export function groupOf(service: Pick<Service, 'name' | 'description'>): GroupRule | typeof MORE {
  const byName = RULES.find((rule) => rule.match.test(service.name));
  if (byName) return byName;
  const description = service.description ?? '';
  const hits = RULES.filter((rule) => rule.match.test(description));
  const has = (id: GroupId) => hits.some((rule) => rule.id === id);
  if (!has('coating') && has('interior') && (has('wash') || has('correction'))) return RULES[0];
  return hits[0] ?? MORE;
}

/** Services in their groups, keeping the owner's display order inside each; empty groups are left out. */
export function group(services: readonly Service[]): Group[] {
  const groups = new Map<GroupId, Group>();
  for (const service of services) {
    const rule = groupOf(service);
    let g = groups.get(rule.id);
    if (!g) {
      g = { id: rule.id, label: rule.label, note: rule.note, photo: rule.photo, services: [] };
      groups.set(rule.id, g);
    }
    g.services.push(service);
  }
  return ORDER.flatMap((id) => (groups.has(id) ? [groups.get(id)!] : []));
}

/** "45 min", "1 h 30 min", "8 h" — durations straight from the engine. */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** The same, for screen readers. */
export function durationSpoken(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${minutes} minutes`;
  const hours = `${h} hour${h > 1 ? 's' : ''}`;
  return m ? `${hours} ${m} minutes` : hours;
}

/**
 * The scale of the "time in the bay" meter: the longest service, rounded up to
 * a whole hour (at least 2 h), so every bar is comparable within the list.
 */
export function bayScaleMinutes(services: readonly Pick<Service, 'durationMinutes'>[]): number {
  const longest = services.reduce((max, s) => Math.max(max, s.durationMinutes), 0);
  return Math.max(120, Math.ceil(longest / 60) * 60);
}

export function priceLabel(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  if (service.priceCents === null) return 'Price on request';
  const amount = formatMoney(service.priceCents, service.currency, locale);
  return service.priceFrom ? `from ${amount}` : amount;
}

/**
 * The price as the menu shows it: the amount, and whether it is a starting
 * price ("from" — the engine's `priceFrom`, used for work that depends on the
 * car's size and condition). Whole dollars print without ".00".
 */
export function priceParts(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): { from: boolean; amount: string } {
  if (service.priceCents === null) return { from: false, amount: 'Price on request' };
  return { from: service.priceFrom, amount: formatMoney(service.priceCents, service.currency, locale).replace(/([.,])00(?!\d)/, '') };
}

/** Whole-dollar prices print without ".00" — "$95", not "$95.00". */
export function shortPrice(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  return priceLabel(service, locale).replace(/([.,])00(?!\d)/, '');
}
