import { useI18n } from '../lib/i18n';
import { AwardIcon, CloseIcon, DownloadIcon } from './icons';
import { Overlay } from './Overlay';

type DiplomaLightboxProps = {
  title: string;
  file: string;
  onClose: () => void;
};

export function DiplomaLightbox({ title, file, onClose }: DiplomaLightboxProps) {
  const { t } = useI18n();

  return (
    <Overlay
      onClose={onClose}
      className="overlay--center"
      panelClassName="overlay__panel overlay__panel--diploma"
      labelledBy="diploma-title"
    >
      <div className="overlay__bar">
        <div className="diploma__title" id="diploma-title">
          {t(title)}
        </div>
        <button type="button" className="icon-btn" aria-label={t('Close')} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="diploma__body">
        <div className="diploma__preview">
          <AwardIcon size={46} strokeWidth={1.4} color="var(--accent)" />
          <div className="diploma__kicker">{t('DIPLOMA PREVIEW')}</div>
          <div className="diploma__file">{file}</div>
        </div>
      </div>

      <div className="diploma__foot">
        <a className="btn btn--accent btn--sm card-hover" href={`/files/${file}`} download>
          <DownloadIcon />
          {t('Download PDF')}
        </a>
      </div>
    </Overlay>
  );
}
