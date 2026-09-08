import { profile } from '../data/portfolio';
import { useI18n } from '../lib/i18n';
import { AccentTitle, SectionRail } from './primitives';

export function Contact() {
  const { t } = useI18n();

  const cards = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, external: false },
    { label: 'LinkedIn', value: profile.linkedin.label, href: profile.linkedin.href, external: true },
    { label: 'GitHub', value: profile.github.label, href: profile.github.href, external: true },
    { label: 'Where', value: profile.location, href: null, external: false },
  ];

  return (
    <section className="contact" id="contact">
      <div className="shell">
        <div className="section-grid">
          <SectionRail num="07" label="Contact" />

          <div>
            <AccentTitle text="Let's build something" className="contact__title" />
            <p className="contact__lede">
              {t(
                'Fastest way to reach me is email — I usually answer within a day. Currently open to senior IC roles and small-team tech-lead positions.',
              )}
            </p>

            <div className="contact__grid">
              {cards.map((card) => {
                const body = (
                  <>
                    <div className="contact-card__label">{t(card.label)}</div>
                    <div className="contact-card__value">{card.value}</div>
                  </>
                );

                return card.href ? (
                  <a
                    key={card.label}
                    className="contact-card card-hover"
                    href={card.href}
                    {...(card.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {body}
                  </a>
                ) : (
                  <div key={card.label} className="contact-card">
                    {body}
                  </div>
                );
              })}
            </div>

            <div className="contact__footer">
              <span>{t(profile.copyright)}</span>
              <span style={{ letterSpacing: '0.12em' }}>v3 — MODERN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
