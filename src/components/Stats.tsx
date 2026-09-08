import { stats } from '../data/portfolio';
import { useI18n } from '../lib/i18n';

export function Stats() {
  const { t } = useI18n();
  return (
    <section className="band">
      <div className="shell">
        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat__value">
                {stat.value}
                {stat.suffix ? <span className="accent-dot">{stat.suffix}</span> : null}
              </div>
              <div className="stat__label">{t(stat.label)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
