# CLAUDE.md

Jorge L. Herrera's personal portfolio: a single-page React 18 + TypeScript +
Vite site, ported from the "Portfolio Modern" artboard in the Claude Design
project linked in `README.md`. Read the README for background; this file is the
working guide.

## Commands

```bash
npm run dev         # http://localhost:5173
npm run typecheck   # tsc --noEmit — run after every change
npm run build       # tsc -b && vite build → dist/
```

There are no tests, linter, or CI. `typecheck` plus a build is the bar.

## Where things go

- **Content** — all copy (profile, jobs, studies, projects, skills, files, nav
  sections) lives in `src/data/portfolio.ts`, typed by `src/data/types.ts`.
  Content changes should touch only these files.
- **State** — `src/App.tsx` owns all state and handlers (the port of the
  design's `DCLogic`). Components are presentational and take props.
- **Components** — one file per section in `src/components/`, plus the three
  overlays (`ProjectDetail`, `DiplomaLightbox`, `EditModal`). Shared bits are in
  `primitives.tsx` and `icons.tsx`.
- **Styles** — everything is in `src/theme.css`. No CSS framework, no CSS
  modules. Use the existing custom-property tokens rather than hard-coded
  colors. The light palette is on `:root` and dark overrides it under
  `[data-theme='dark']`; check both themes.
- **Static files** — downloads live in `public/files/` and are referenced by
  path from `portfolio.ts`. See `public/files/README.md` for expected filenames.

## Conventions

- **Translations.** Every user-visible string goes through `t()` from
  `useLang`/`LangContext` (`src/lib/i18n.ts`). The English string *is* the
  key; add the Spanish to `DICT` whenever you add or change English copy, or it
  silently falls back to English.
- **Persistence keys** are `jh-portfolio-theme` and `jh-portfolio-lang`. The
  theme key is also read by the inline script in `index.html` — change both
  together.
- **Overlays** wrap their content in `components/Overlay.tsx`, which supplies
  the dialog role, backdrop-click and Escape to close, and scroll lock (via
  `useOverlay`). Build new overlays on it.
- **Edit mode** (`?edit=1`) is client-only: edits live in React state and are
  lost on reload. Don't present it as persisted.
- **Accessibility** — interactive cards and the carousel are keyboard-operable,
  and `prefers-reduced-motion` disables motion. Preserve both.
- **Responsive** breakpoints are 1080/900/600px. The desktop layout matches
  the artboard; don't change it without reason.
- Strict TS with `noUnusedLocals`/`noUnusedParameters` — remove unused code
  rather than prefixing it.

## Known gaps

- `public/files/` has no PDFs yet, so download links 404.
- Some content in `portfolio.ts` is placeholder (employer "Acme Software",
  `*.example.com` project URLs, contact email). Confirm with Jorge before
  treating any of it as fact.
