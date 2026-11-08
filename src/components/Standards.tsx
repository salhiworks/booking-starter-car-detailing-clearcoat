import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';

/** What every car gets, whatever is booked: the owner's standards as a measured spec sheet. */
export function Standards({ values }: { values: SiteValues }) {
  const items = values['standards.items'];
  return (
    <section id="standards" className="section standards" aria-labelledby="standards-title">
      <div className="page standards__grid">
        <header className="section-head standards__head">
          <p className="index" aria-hidden="true">
            04
          </p>
          <h2 id="standards-title">
            <Emphasis text={values['standards.title']} />
          </h2>
          {values['standards.text'] && <p className="section-intro">{values['standards.text']}</p>}
        </header>
        {items.length > 0 && (
          <ul className="spec" role="list">
            {items.map((item, i) => (
              <li className="spec__row" key={`${i}-${item.title}`}>
                <span className="spec__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="spec__title">{item.title}</h3>
                {item.text && <p className="spec__text">{item.text}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
