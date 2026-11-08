import type { CSSProperties } from 'react';
import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';

/**
 * How a car moves through the bay: the owner's steps on graphite, each under
 * its own light bar. The bars light one after another as the row comes into
 * view (once; still for reduced motion).
 */
export function Process({ values }: { values: SiteValues }) {
  const steps = values['process.steps'];
  if (steps.length === 0) return null;
  return (
    <section id="process" className="section night process" aria-labelledby="process-title">
      <div className="page">
        <header className="section-head process__head">
          <p className="index index--night" aria-hidden="true">
            02
          </p>
          <h2 id="process-title">
            <Emphasis text={values['process.title']} />
          </h2>
          {values['process.intro'] && <p className="section-intro">{values['process.intro']}</p>}
        </header>
        <ol className="steps" role="list" data-count={steps.length}>
          {steps.map((step, i) => (
            <li className="step" key={`${i}-${step.title}`} style={{ '--i': i } as CSSProperties}>
              <span className="step__bar" aria-hidden="true" />
              <span className="step__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="step__title">{step.title}</h3>
              {step.text && <p className="step__text">{step.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
