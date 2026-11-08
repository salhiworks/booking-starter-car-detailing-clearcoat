import type { SiteImage } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

interface WorkProps {
  values: SiteValues;
  /** Fields the owner has set — a photo's "Sample" label disappears once they replace it. */
  ownerFields: string[];
}

/**
 * In the bay: recent work on graphite, so gloss and reflections carry the
 * page. One wide frame opens the set, then portrait frames; a swipeable rail
 * of large frames on phones (paint detail needs size more than a grid).
 */
export function Work({ values, ownerFields }: WorkProps) {
  const items = shots(values, ownerFields);
  const sample = items.some((item) => item.sample);
  const linkLabel = values['gallery.linkLabel'].trim();
  const linkUrl = values['gallery.linkUrl'].trim();
  if (items.length === 0) return null;
  return (
    <section id="work" className="section night work" aria-labelledby="work-title">
      <div className="page work__top">
        <header className="section-head work__head">
          <p className="index index--night" aria-hidden="true">
            03
          </p>
          <h2 id="work-title">
            <Emphasis text={values['gallery.title']} />
          </h2>
          {values['gallery.intro'] && <p className="section-intro">{values['gallery.intro']}</p>}
        </header>
        {sample && (
          <p className="sample-note sample-note--night">
            <span className="tag">Sample photos</span>
            Stock images stand in until the studio adds its own work.
          </p>
        )}
      </div>
      <div className="work__viewport" role="region" aria-label="Recent work — scroll sideways for more" tabIndex={0}>
        <ol className="work__grid page" role="list" data-count={items.length}>
          {items.map((item, i) => (
            <li className={`shot ${item.wide ? 'shot--wide' : ''}`} key={`${i}-${item.photo.src}`}>
              <figure>
                <div className="shot__frame">
                  <Photo
                    image={item.photo}
                    sizes={item.wide ? '(min-width: 960px) 52vw, 86vw' : '(min-width: 960px) 24vw, (min-width: 720px) 40vw, 72vw'}
                    className="shot__photo"
                  />
                  {item.sample && <span className="tag tag--on-photo">Sample</span>}
                </div>
                {(item.caption || item.service) && (
                  <figcaption className="shot__caption">
                    <span className="shot__n" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.caption && <span className="shot__name">{item.caption}</span>}
                    {item.service && <span className="shot__service">{item.service}</span>}
                  </figcaption>
                )}
              </figure>
            </li>
          ))}
        </ol>
      </div>
      {linkLabel && linkUrl && (
        <div className="page work__more">
          <a className="link-button link-button--night" href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkLabel}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      )}
    </section>
  );
}

interface Shot {
  photo: SiteImage;
  caption: string;
  service: string;
  wide: boolean;
  /** Still the starter's stock photo: labelled until the owner replaces it. */
  sample: boolean;
}

const SLOTS = [1, 2, 3, 4, 5] as const;

/** The five photo fields in order, skipping removed ones; "What · Service" captions split in two. */
function shots(values: SiteValues, ownerFields: string[]): Shot[] {
  return SLOTS.flatMap((n) => {
    const photo = values[`gallery.photo${n}`];
    if (!photo) return [];
    const [caption = '', ...rest] = values[`gallery.caption${n}`].split(/\s+·\s+/);
    return [
      {
        photo,
        caption: caption.trim(),
        service: rest.join(' · ').trim(),
        wide: n === 1,
        sample: !ownerFields.includes(`gallery.photo${n}`),
      },
    ];
  });
}
