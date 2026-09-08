import { useCallback, useEffect, useState } from 'react';
import type { Lang } from './i18n';

const THEME_KEY = 'jh-portfolio-theme';
const LANG_KEY = 'jh-portfolio-lang';

export type Theme = 'light' | 'dark';

function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored && (allowed as readonly string[]).includes(stored)) return stored as T;
  } catch {
    /* private mode / storage disabled — fall through to the default */
  }
  return fallback;
}

/**
 * `index.html` sets `data-theme` before first paint so there is no flash; this
 * hook takes over from there and keeps the attribute and storage in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStored(THEME_KEY, ['light', 'dark'], 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
}

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => readStored(LANG_KEY, ['en', 'es'], 'en'));

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  return { lang, setLang };
}

/** Closes an overlay on Escape and locks background scroll while it is open. */
export function useOverlay(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);
}
