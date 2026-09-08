import type { KeyboardEvent } from 'react';
import type { Project } from '../data/types';
import { useI18n } from '../lib/i18n';
import { PencilIcon, PlusIcon } from './icons';
import { AccentTitle, ChipRow, SectionRail } from './primitives';

type ProjectsProps = {
  projects: Project[];
  editable: boolean;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onOpen: (index: number) => void;
};

export function Projects({ projects, editable, onAdd, onEdit, onOpen }: ProjectsProps) {
  const { t } = useI18n();

  // The whole card is the target, so it takes a button role rather than being a
  // <button> — the edit affordance nests inside it and buttons cannot nest.
  const onCardKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(index);
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="shell">
        <div className="section-grid">
          <SectionRail num="05" label="Projects" />

          <div>
            <div className="projects__head">
              <AccentTitle text="Selected work" />
              {editable ? (
                <button type="button" className="btn--ghost-dashed" onClick={onAdd}>
                  <PlusIcon />
                  {t('Add project')}
                </button>
              ) : null}
            </div>

            <div className="projects__grid">
              {projects.map((project, index) => (
                <article
                  key={`${project.title}-${index}`}
                  className="project-card card-hover"
                  role="button"
                  tabIndex={0}
                  aria-label={`${t('View project')} — ${project.title}`}
                  onClick={() => onOpen(index)}
                  onKeyDown={(event) => onCardKeyDown(event, index)}
                >
                  <div
                    className={
                      project.accent
                        ? 'project-card__thumb project-card__thumb--accent'
                        : 'project-card__thumb'
                    }
                  >
                    <div className="project-card__thumb-label">{t('PROJECT THUMBNAIL')}</div>
                    <div className="project-card__year">{project.year}</div>

                    {editable ? (
                      <button
                        type="button"
                        className="icon-btn"
                        aria-label={`${t('Edit')} — ${project.title}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          onEdit(index);
                        }}
                      >
                        <PencilIcon />
                      </button>
                    ) : null}
                  </div>

                  <div className="project-card__body">
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__desc">{project.desc}</p>
                    <ChipRow items={project.tags} tight variant="chip--sm" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
