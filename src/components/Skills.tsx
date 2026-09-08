import { skillGroups } from '../data/portfolio';
import { useI18n } from '../lib/i18n';
import { ChipRow, SectionRail } from './primitives';

export function Skills() {
  const { t } = useI18n();

  return (
    <section className="band skills" id="stack">
      <div className="shell">
        <div className="section-grid">
          <SectionRail num="04" label="Stack" />
          <div className="card-pair">
            {skillGroups.map((group) => (
              <div className="skill-card" key={group.name}>
                <div className="skill-card__head">
                  <span className="dot" />
                  {t(group.name)}
                </div>
                <ChipRow items={group.items} variant="chip--lg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
