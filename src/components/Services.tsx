import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Business, Service, SiteImage } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { bayScaleMinutes, durationLabel, durationSpoken, group, priceParts } from '../lib/services';
import type { Group } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';
import { Photo } from './Photo';

interface ServicesProps {
  values: SiteValues;
  ownerFields: string[];
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

/**
 * Services and prices, straight from the engine: every name, length and price
 * is the one the booking uses. Services sit in groups (Full details, Wash &
 * protect, Interior, Paint correction, Ceramic coating) found from their names.
 * A sticky bar jumps between groups; on wide screens a tall photo beside the
 * list follows the group you are reading. Each row shows its time in the bay
 * as a bar on one shared scale, so a two-hour wash and an eight-hour
 * correction read at a glance.
 */
export function Services({ values, ownerFields, services, business, onRetry, onBook }: ServicesProps) {
  const locale = business?.locale ?? 'en-US';
  const groups = services.status === 'ready' ? group(services.data) : [];
  const scale = services.status === 'ready' ? bayScaleMinutes(services.data) : 480;
  const active = useActiveGroup(groups.map((g) => g.id).join(','));
  const photos = groups.flatMap((g) => {
    const image = g.photo ? values[g.photo] : null;
    return image && g.photo ? [{ id: g.id, label: g.label, image, sample: !ownerFields.includes(g.photo) }] : [];
  });
  // The viewer keeps the photo of the nearest group above that has one.
  const activeIndex = Math.max(0, groups.findIndex((g) => g.id === active));
  const shownId = groups
    .slice(0, activeIndex + 1)
    .reverse()
    .find((g) => photos.some((p) => p.id === g.id))?.id ?? photos[0]?.id;

  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="page">
        <header className="section-head services__head">
          <p className="index" aria-hidden="true">
            01
          </p>
          <h2 id="services-title">
            <Emphasis text={values['services.title']} />
          </h2>
          {values['services.intro'] && <p className="section-intro">{values['services.intro']}</p>}
        </header>

        {services.status === 'loading' && (
          <div className="services__loading" aria-busy="true">
            <p className="sr-only" role="status">
              Loading services…
            </p>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton skeleton--service" aria-hidden="true" />
            ))}
          </div>
        )}

        {services.status === 'error' &&
          (services.error.code === 'NOT_CONFIGURED' ? (
            <p className="quiet-state">Our services and prices will be listed here soon.</p>
          ) : (
            <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
              <p>We couldn't load our services just now.</p>
            </Notice>
          ))}

        {services.status === 'ready' && groups.length === 0 && (
          <p className="quiet-state">Our services will be listed here soon — call or email the studio in the meantime.</p>
        )}

        {groups.length > 0 && (
          <>
            {groups.length > 1 && (
              <nav className="group-bar" aria-label="Service groups">
                <ul role="list">
                  {groups.map((g) => (
                    <li key={g.id}>
                      <a href={`#group-${g.id}`} aria-current={active === g.id ? 'true' : undefined}>
                        {g.label}
                        <span className="group-bar__count" aria-hidden="true">
                          {g.services.length}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className={`services__layout ${photos.length ? 'services__layout--viewer' : ''}`}>
              {photos.length > 0 && (
                <div className="viewer" aria-hidden="true">
                  <div className="viewer__frames">
                    {photos.map((p) => (
                      <div className="viewer__frame" key={p.id} data-shown={p.id === shownId ? '' : undefined}>
                        <Photo image={p.image} sizes="(min-width: 1100px) 24rem, 30vw" className="viewer__photo" />
                        {p.sample && <span className="tag tag--on-photo">Sample</span>}
                        <span className="viewer__label">{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="services__groups">
                {groups.map((g, i) => (
                  <GroupBlock
                    key={g.id}
                    group={g}
                    n={i + 1}
                    note={g.note ? values[g.note] : ''}
                    photo={g.photo ? values[g.photo] : null}
                    sample={g.photo ? !ownerFields.includes(g.photo) : false}
                    scale={scale}
                    locale={locale}
                    onBook={onBook}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

interface GroupBlockProps {
  group: Group;
  n: number;
  note: string;
  photo: SiteImage | null;
  sample: boolean;
  scale: number;
  locale: string;
  onBook: StartBooking;
}

function GroupBlock({ group: g, n, note, photo, sample, scale, locale, onBook }: GroupBlockProps) {
  return (
    <section className="group" id={`group-${g.id}`} aria-labelledby={`group-${g.id}-title`} data-group={g.id}>
      {photo && (
        <div className="group__strip">
          <Photo image={photo} sizes="100vw" className="group__photo" />
          {sample && <span className="tag tag--on-photo">Sample</span>}
        </div>
      )}
      <header className="group__head">
        <span className="group__n" aria-hidden="true">
          {String(n).padStart(2, '0')}
        </span>
        <h3 id={`group-${g.id}-title`} className="group__title">
          {g.label}
        </h3>
        {note && <p className="group__note">{note}</p>}
      </header>
      <ul className="svc-list" role="list">
        {g.services.map((service) => (
          <li className="svc" key={service.id}>
            {service.image && (
              <img
                className="svc__thumb"
                src={service.image.url}
                alt={service.image.alt}
                width={service.image.width ?? 160}
                height={service.image.height ?? 160}
                loading="lazy"
                decoding="async"
              />
            )}
            <div className="svc__main">
              <h4 className="svc__name">{service.name}</h4>
              {service.description && <p className="svc__desc">{service.description}</p>}
            </div>
            <p className="svc__bay">
              <span className="bay" aria-hidden="true" style={{ '--fill': `${Math.min(100, (service.durationMinutes / scale) * 100)}%` } as CSSProperties}>
                <span className="bay__fill" />
              </span>
              <span className="svc__time">
                <span aria-hidden="true">{durationLabel(service.durationMinutes)}</span>
                <span className="sr-only">In the bay for {durationSpoken(service.durationMinutes)}</span>
              </span>
            </p>
            <Price service={service} locale={locale} />
            <a className="svc__book" href="#book" onClick={bookLink(onBook, service.id)}>
              Book<span className="sr-only"> {service.name}</span>
              <span className="svc__arrow" aria-hidden="true">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "From" sits above a starting price, so every amount lines up on the right. */
function Price({ service, locale }: { service: Service; locale: string }) {
  const { from, amount } = priceParts(service, locale);
  return (
    <p className="svc__price" data-on-request={service.priceCents === null ? '' : undefined}>
      {from && <span className="svc__from">from </span>}
      <span className="svc__amount">{amount}</span>
    </p>
  );
}

/** The group nearest the top of the screen: the bar's current mark and the viewer's photo. */
function useActiveGroup(key: string): string | null {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!key || !('IntersectionObserver' in window)) return;
    const blocks = [...document.querySelectorAll<HTMLElement>('.group[data-group]')];
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.group!;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        const first = blocks.find((b) => visible.has(b.dataset.group!));
        if (first) setActive(first.dataset.group!);
      },
      { rootMargin: '-30% 0px -50% 0px' },
    );
    blocks.forEach((b) => observer.observe(b));
    return () => observer.disconnect();
  }, [key]);
  return active;
}
