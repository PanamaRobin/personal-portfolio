import type { Work } from '../data/types';
import { useI18n } from '../lib/i18n';
import { PencilIcon, PlusIcon } from './icons';
import { ChipRow, SectionRail } from './primitives';

type ExperienceProps = {
  work: Work[];
  editable: boolean;
  onAdd: () => void;
  onEdit: (index: number) => void;
};

export function Experience({ work, editable, onAdd, onEdit }: ExperienceProps) {
  const { t } = useI18n();

  return (
    <section className="band experience" id="work">
      <div className="shell">
        <div className="section-grid">
          <SectionRail num="02" label="Work">
            {editable ? (
              <button
                type="button"
                className="btn--ghost-dashed"
                style={{ marginTop: 18 }}
                onClick={onAdd}
              >
                <PlusIcon />
                {t('Add experience')}
              </button>
            ) : null}
          </SectionRail>

          <div>
            {work.map((job, index) => (
              <article className="job" key={`${job.company}-${job.period}-${index}`}>
                {editable ? (
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`${t('Edit')} — ${job.role}`}
                    onClick={() => onEdit(index)}
                  >
                    <PencilIcon />
                  </button>
                ) : null}

                <div className="job__head">
                  <h3 className="job__role">{t(job.role)}</h3>
                  {job.current ? <span className="badge-current">{t('CURRENT')}</span> : null}
                </div>

                <div className="job__meta">
                  {job.company} · {job.loc} · {job.period}
                </div>
                <p className="job__desc">{t(job.desc)}</p>
                <ChipRow items={job.tags} variant="chip--on-alt" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
