import { featuredStack, heroFacts } from '../data/portfolio';
import { useI18n } from '../lib/i18n';
import { ChipRow, Eyebrow } from './primitives';

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero__grid">
          <div>
            <div className="hero__badge">
              <span className="dot" />
              {t('Open to new opportunities')}
            </div>

            <h1 className="hero__title">
              {t('Software')}
              <br />
              {t('engineer')}
              <span className="accent-dot">.</span>
            </h1>

            <p className="hero__lede">
              {t(
                "I'm Jorge — a Panamanian engineer building complex apps, AI-touched products, and the everyday work of features, APIs, tests, and deploys.",
              )}
            </p>

            <div className="hero__actions">
              <a className="btn btn--solid card-hover" href="#projects">
                {t('View work')} <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn--outline card-hover" href="#contact">
                {t('Get in touch')}
              </a>
            </div>
          </div>

          <div className="hero__card">
            <div className="hero__facts">
              {heroFacts.map((fact) => (
                <div key={fact.label}>
                  <div className="eyebrow fact__label">{t(fact.label)}</div>
                  <div className="fact__value">{t(fact.value)}</div>
                </div>
              ))}
            </div>

            <div className="hero__stack">
              <Eyebrow text="Featured stack" />
              <ChipRow items={featuredStack} tight />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
