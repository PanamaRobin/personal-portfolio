import { useI18n } from '../lib/i18n';
import { SectionRail } from './primitives';

export function About() {
  const { t } = useI18n();

  return (
    <section className="about" id="about">
      <div className="shell">
        <div className="section-grid">
          <SectionRail num="01" label="About" />
          <div className="about__body">
            <h2 className="about__title">{t('Engineering for an ever-changing industry.')}</h2>
            <p>
              {t(
                "I work across the stack — typed-up Angular front-ends, Spring Boot APIs, mobile in Ionic and Swift, Python and AWS where the data lives — and I've spent the last couple of years building and deploying AI-touched products alongside the everyday work of features, code reviews, unit tests, and deploys.",
              )}
            </p>
            <p>
              {t(
                'The thing I care about most is keeping the lights on for the teams I work with: small clear changes, tests that actually catch regressions, pull requests a teammate can read without needing a coffee first.',
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
