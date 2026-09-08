# personal-portfolio

Jorge L. Herrera's portfolio site — an implementation of the `Portfolio Modern`
artboard from the [Software engineer portfolio site][design] Claude Design
project.

[design]: https://claude.ai/design/p/a36c03df-9a84-4c35-897f-676efd69ba01

## Stack

React 18 + TypeScript + Vite. No CSS framework — the design's tokens live in
`src/theme.css` as custom properties, and the light/dark palettes are ported
verbatim from the artboard.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build → dist/
npm run typecheck
```

## Layout

```
src/
  App.tsx              state + handlers (port of the design's DCLogic component)
  theme.css            design tokens, component styles, responsive rules
  data/
    portfolio.ts       all copy and content
    types.ts
  lib/
    i18n.ts            EN→ES dictionary, keyed on the English source string
    hooks.ts           theme, language, overlay behaviour
    editMode.ts
  components/          one file per section, plus the three overlays
```

## Things worth knowing

**Content lives in `src/data/portfolio.ts`.** Work history, studies, projects,
skills, files, and contact details are all there. Nothing else needs editing to
change what the site says.

**Language.** The artboard switched languages by walking the DOM and swapping
text nodes against a dictionary. That is reimplemented as a `t()` function over
the same dictionary, keyed the same way — English strings are the keys, and
anything missing falls through to English. The choice persists in
`localStorage` under `jh-portfolio-lang`.

**Theme.** `index.html` sets `data-theme` before first paint so there is no
flash of the wrong theme; `useTheme` takes over from there. Persists under
`jh-portfolio-theme`.

**Edit mode.** The design exposed a `loggedIn` prop, defaulting to true, so the
artboard could show its add/edit affordances. There is no auth behind this
site, so those affordances are opt-in via `?edit=1` and hidden from visitors.
Edits apply to React state only — nothing is persisted or sent anywhere, and a
reload restores the data in `portfolio.ts`. Wiring it to a real backend is the
natural next step if the editing is meant to stick.

**Downloads.** The Files section and diploma lightbox link into `public/files/`,
which currently holds placeholders — see the README there.

## Deviations from the artboard

The artboard is a fixed 1200px-wide desktop composition. Everything below is an
addition rather than a port:

- Responsive breakpoints at 1080/900/600px; the desktop layout is unchanged.
- Nav items are real anchors to section ids, and the nav is sticky.
- Contact and file links point at real `mailto:`/profile/file URLs.
- Overlays close on Escape, lock background scroll, and carry dialog roles; the
  carousel also responds to arrow keys.
- Project cards are keyboard-operable.
- Inactive carousel dots use a neutral token — the design's translucent white
  was invisible against the light-theme carousel background.
- `prefers-reduced-motion` disables the hover lift and smooth scrolling.
