import { useEffect } from 'react';
import type { Project } from '../data/types';
import { useI18n } from '../lib/i18n';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ExternalLinkIcon,
} from './icons';
import { Overlay } from './Overlay';
import { ChipRow } from './primitives';

type ProjectDetailProps = {
  project: Project;
  slide: number;
  onSlide: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
};

export function ProjectDetail({
  project,
  slide,
  onSlide,
  onPrev,
  onNext,
  onClose,
}: ProjectDetailProps) {
  const { t } = useI18n();
  const total = project.shots.length;

  // Arrow keys drive the carousel while the detail view is open.
  useEffect(() => {
    if (total < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [total, onPrev, onNext]);

  const urlShort = project.url?.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <Overlay
      onClose={onClose}
      panelClassName="overlay__panel overlay__panel--project"
      labelledBy="project-detail-title"
    >
      <div className="overlay__bar">
        <button type="button" className="overlay__back" onClick={onClose}>
          <ArrowLeftIcon />
          {t('Back to projects')}
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--lg"
          aria-label={t('Close')}
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>

      {total > 0 ? (
        <div className="carousel">
          <div className="carousel__stage">
            <div className="carousel__kicker">{t('PROJECT SCREENSHOT')}</div>
            <div className="carousel__label">{project.shots[slide]}</div>
          </div>

          {total > 1 ? (
            <>
              <button
                type="button"
                className="carousel__arrow carousel__arrow--prev"
                aria-label="Previous"
                onClick={onPrev}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className="carousel__arrow carousel__arrow--next"
                aria-label="Next"
                onClick={onNext}
              >
                <ChevronRightIcon />
              </button>
            </>
          ) : null}

          <div className="carousel__count">
            {slide + 1} / {total}
          </div>

          {total > 1 ? (
            <div className="carousel__dots">
              {project.shots.map((shot, index) => (
                <button
                  key={shot}
                  type="button"
                  className="carousel__dot"
                  aria-label={shot}
                  aria-current={index === slide}
                  onClick={() => onSlide(index)}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="detail">
        <div className="detail__head">
          <h2 className="detail__title" id="project-detail-title">
            {project.title}
          </h2>
          <span className="detail__year">{project.year}</span>
          {project.url ? (
            <a className="detail__link" href={project.url} target="_blank" rel="noreferrer">
              {urlShort}
              <ExternalLinkIcon />
            </a>
          ) : null}
        </div>

        <div className="detail__meta">
          <div>
            <div className="eyebrow">{t('Role')}</div>
            <div className="detail__meta-value">{project.role}</div>
          </div>
          <div>
            <div className="eyebrow">{t('When')}</div>
            <div className="detail__meta-value">{project.period}</div>
          </div>
        </div>

        <div className="eyebrow">{t('Overview')}</div>
        <p className="detail__overview">{project.overview}</p>

        <div className="eyebrow">{t('Stack')}</div>
        <ChipRow items={project.tags} variant="chip--md" />
      </div>
    </Overlay>
  );
}
