import { formatMoney } from '@profitstudio/booking-engine';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import type { Resource } from '../lib/resource';
import { durationLabel } from '../lib/services';
import { bookLink } from '../lib/bookLink';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 46vw, 100vw';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  services: Resource<Service[]>;
  business: Business | null;
  onBook: StartBooking;
}

/** Plain facts from the engine: the lowest price and the range of time in the bay. Nothing is invented. */
function serviceFacts(services: Resource<Service[]>, business: Business | null) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const lengths = services.data.map((s) => s.durationMinutes);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const priced = services.data.filter((s) => s.priceCents !== null);
  const cheapest = priced.length ? priced.reduce((a, b) => ((a.priceCents ?? 0) <= (b.priceCents ?? 0) ? a : b)) : null;
  return {
    lengths: min === max ? durationLabel(min) : `${durationLabel(min)} – ${durationLabel(max)}`,
    from: cheapest
      ? formatMoney(cheapest.priceCents ?? 0, cheapest.currency, business?.locale ?? 'en-US').replace(/([.,])00(?!\d)/, '')
      : null,
  };
}

/**
 * The first screen: the dark bay. The headline and one Book button on graphite,
 * the photo running to the right edge (full width on phones), and a row of
 * engine facts under a light line that sweeps across once, like a reflection
 * travelling along a panel.
 */
export function Hero({ values, status, services, business, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const facts = serviceFacts(services, business);
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      {photo && (
        <div className="hero__media">
          <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />
        </div>
      )}
      <div className="page hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow eyebrow--night hero__eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large button--light" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
              <span className="button__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="hero__link" href="#services">
              Services &amp; prices
            </a>
          </div>
        </div>
        {(facts || status) && (
          <div className="hero__facts-wrap hero__enter">
            <span className="lightline lightline--sweep" aria-hidden="true" />
            <dl className="hero__facts">
              {facts?.from && (
                <div>
                  <dt>Services from</dt>
                  <dd>{facts.from}</dd>
                </div>
              )}
              {facts && (
                <div>
                  <dt>Time in the bay</dt>
                  <dd>{facts.lengths}</dd>
                </div>
              )}
              {status && (
                <div className="hero__fact-status">
                  <dt>Today</dt>
                  <dd className="open-status" data-open={status.open}>
                    <span className="open-status__dot" aria-hidden="true" />
                    {status.text}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
