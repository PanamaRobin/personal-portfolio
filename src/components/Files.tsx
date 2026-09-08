import { files } from '../data/portfolio';
import { useI18n } from '../lib/i18n';
import { AwardIcon, DocIcon, LetterIcon, UploadIcon } from './icons';
import { AccentTitle, SectionRail } from './primitives';

function FileIcon({ kind }: { kind: 'doc' | 'award' | 'letter' }) {
  if (kind === 'award') return <AwardIcon size={20} />;
  if (kind === 'letter') return <LetterIcon />;
  return <DocIcon />;
}

export function Files({ editable }: { editable: boolean }) {
  const { t } = useI18n();

  return (
    <section className="band files" id="files">
      <div className="shell">
        <div className="section-grid">
          <SectionRail num="06" label="Files" />

          <div>
            <div className="files__intro">
              <AccentTitle text="Downloadable" />
              <p>
                {t(
                  'CV, certifications, and diplomas — direct downloads. The drop zone at the bottom is only visible to me when I’m signed in.',
                )}
              </p>
            </div>

            <div className="files__grid">
              {files.map((file) => (
                <a className="file-card card-hover" key={file.title} href={file.href} download>
                  <div className="file-card__head">
                    <div className="file-card__icon">
                      <FileIcon kind={file.icon} />
                    </div>
                    <span className="file-card__kind">{file.kind}</span>
                  </div>
                  <h4 className="file-card__title">{t(file.title)}</h4>
                  <div className="file-card__meta">{file.meta}</div>
                  <span className="file-card__cta">{t(file.cta ?? 'Download →')}</span>
                </a>
              ))}
            </div>

            {editable ? (
              <div className="dropzone">
                <div className="dropzone__icon">
                  <UploadIcon />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="dropzone__signed">
                    <span className="dot" />
                    {t('Signed in as Jorge')}
                  </div>
                  <div className="dropzone__title">{t('Drop files to add them to this list')}</div>
                  <div className="dropzone__hint">
                    {t('PDF, PNG, JPG · only visible to you when logged in.')}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
