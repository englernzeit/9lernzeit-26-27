# English Explorer — Lernzeit 26/27

Static English-learning site with a watercolor journal aesthetic, built for
iPad (landscape). A homepage world map leads to 4 unit stops; each opens a
carousel of 7 location buttons that route to journal-styled section pages.

Built per `spec-addendum_1.md` (build-in-stages rule): the **navigation shell
is complete, all page content is intentionally empty** and will be supplied
later.

**Visual language is locked in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)** —
palette, watercolor style, paper/tape/sticker materials, buttons, shadows,
motion, map and typography rules, plus the master prompt for generating all
assets. Every new asset and UI element must follow it; CSS tokens in
[css/tokens.css](css/tokens.css) mirror it 1:1.

## Tech decisions

- **Vanilla ES6 modules, no React / no build step.** The site is static,
  animation must be CSS-transforms-only at 60 FPS on iPad, and the app is
  three small views over a hash router — a framework adds weight without
  benefit here. No TypeScript, no backend (per spec).
- **Hash routing** (`#/unit/:id/:sectionId`) so plain static hosting works
  with no server rewrites.
- **localStorage** is used for exactly one thing: the Today's Plan checklist
  (`js/state/checklistStore.js`). Nothing else persists.
- **Responsive orientations** (supersedes the spec's landscape-only rule,
  approved 2026-07): landscape keeps the fixed journey-map canvas; portrait
  (phones, vertical iPad) re-composes it into a scrollable top-to-bottom
  journey. Unit positions carry both coordinate sets in `js/data/units.js`
  (`mapPosition` / `mapPositionPortrait`); each orientation has its own SVG
  route. The old "turn me sideways" overlay is removed; the PWA manifest
  uses `"orientation": "any"`.

## Structure

```
index.html              App shell: #app mount, rotate overlay, manifest links
manifest.webmanifest    PWA: fullscreen, landscape, icons
favicon.svg             Placeholder favicon (replace with final art)
css/
  main.css              Import hub (tokens → base → layout → components → views)
  tokens.css            Design tokens — lock watercolor palette/fonts here
  base.css              Reset + element defaults
  layout.css            App shell / view containers
  rotate-overlay.css    Portrait "turn me sideways" overlay (media query only)
  components/           back-tab, carousel, checklist, sticky-note
  views/                map, section
js/
  app.js                Entry point: registers routes
  router.js             Minimal hash router
  data/units.js         Unit/section config — single source of truth for nav
  state/checklistStore.js  The only localStorage user
  views/                mapView, unitView, sectionView (render functions)
  components/           backTab, unitCarousel, checklist
  utils/video.js        Autoplay video factory (muted/playsinline/loop/...)
assets/
  images/  icons/  video/  audio/
```

## Running

No build step. Serve the folder with any static server, e.g.:

```
npx serve .
```

(Opening `index.html` via `file://` won't work — ES6 modules require HTTP.)

## Content integration points

- **Section content** → mount into `.section-view__task-area`
  (`js/views/sectionView.js`).
- **Real unit/location names & map positions** → edit `js/data/units.js`.
- **Checklist items** → pass into `createChecklist()` in
  `js/views/mapView.js`.
- **Assets:** images WebP + PNG fallback, transparent backgrounds for
  decorations; video MP4/H.264, short loops; lock one watercolor style
  reference before generating the ~40+ assets.
