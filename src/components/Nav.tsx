import { navLinks, profile } from '../data/portfolio';
import type { Lang } from '../lib/i18n';
import { useI18n } from '../lib/i18n';
import type { Theme } from '../lib/hooks';
import { MoonIcon, SunIcon } from './icons';

type NavProps = {
  theme: Theme;
  onToggleTheme: () => void;
  onSetLang: (lang: Lang) => void;
};

export function Nav({ theme, onToggleTheme, onSetLang }: NavProps) {
  const { lang, t } = useI18n();

  return (
    <nav className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#top">
          <div className="nav__mark" aria-hidden="true">
            {profile.initial}
          </div>
          <div className="nav__name">{profile.shortName}</div>
        </a>

        <div className="nav__links">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {t(link.label)}
            </a>
          ))}
        </div>

        <div className="nav__actions">
          {/* Language names stay untranslated — they label themselves. */}
          <div className="lang-toggle">
            <button
              type="button"
              onClick={() => onSetLang('es')}
              aria-pressed={lang === 'es'}
              aria-label="Español"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onSetLang('en')}
              aria-pressed={lang === 'en'}
              aria-label="English"
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <a className="btn btn--accent btn--sm card-hover" href={profile.cvHref} download>
            {t('Download CV ↓')}
          </a>
        </div>
      </div>
    </nav>
  );
}
