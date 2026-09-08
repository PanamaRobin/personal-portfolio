import type { Study } from '../data/types';
import { useI18n } from '../lib/i18n';
import { AwardIcon, PencilIcon, PlusIcon } from './icons';
import { SectionRail } from './primitives';

type EducationProps = {
  studies: Study[];
  editable: boolean;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onShowDiploma: (study: Study) => void;
};

export function Education({ studies, editable, onAdd, onEdit, onShowDiploma }: EducationProps) {
  const { t } = useI18n();

  return (
    <section className="education" id="studies">
      <div className="shell">
        <div className="section-grid">
          <SectionRail num="03" label="Studies">
            {editable ? (
              <button
                type="button"
                className="btn--ghost-dashed"
                style={{ marginTop: 18 }}
                onClick={onAdd}
              >
                <PlusIcon />
                {t('Add study')}
              </button>
            ) : null}
          </SectionRail>

          <div className="card-pair">
            {studies.map((study, index) => (
              <article className="study" key={`${study.title}-${index}`}>
                {editable ? (
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`${t('Edit')} — ${study.title}`}
                    onClick={() => onEdit(index)}
                  >
                    <PencilIcon />
                  </button>
                ) : null}

                <div className="study__period">{study.period}</div>
                <h3 className="study__title">{t(study.title)}</h3>
                <div className="study__org">{study.org}</div>
                <p className="study__desc">{t(study.desc)}</p>

                {study.diploma ? (
                  <button
                    type="button"
                    className="study__diploma card-hover"
                    onClick={() => onShowDiploma(study)}
                  >
                    <AwardIcon />
                    {t('Show diploma')}
                  </button>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
