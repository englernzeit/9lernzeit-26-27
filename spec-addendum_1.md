# ENGLISH EXPLORER — SPEC ADDENDUM (Technical Decisions)

Append to the main Project Specification. These are confirmed build rules.

---

## SCOPE & STATE (confirmed)

- **No backend.** Static site only.
- **No accounts, no login, no per-student data.**
- **No progress-saving** beyond the one case below.
- **No offline mode.** Site assumes live network.
- **localStorage** is used for ONE thing only: the Today's Plan checklist
  (see below). Nothing else persists.

---

## BUILD-IN-STAGES RULE

The full navigation shell is built now. Content is filled in later.

- **Section pages:** built as empty templates. Routing, back button, and
  journal styling work; the task area is a placeholder.
- **Units 2, 3, 4:** unit stops and their 7 location buttons are built as
  working shells (clickable, styled, routed) but lead to empty section pages.
- **Unit 1 (Australia):** same shell; content added as provided.
- All learning content (texts, vocab, audio, exercises) is supplied later.
  The build must not block on it.

---

## NAVIGATION

Every drill-down level needs a way back. Required affordances:

- **Section page → Unit carousel:** "Back to [Unit]" tab.
- **Unit carousel → Homepage map:** "Back to Map" tab.
- Back affordances styled as torn-paper / masking-tape tabs to match the
  journal aesthetic. No browser-style chrome.
- **Carousel swap behaviour:** tapping a different unit stop while a carousel
  is open closes the current one and opens the new one. Panels never stack.

---

## TODAY'S PLAN CHECKLIST

- Each checklist item is **tappable** (toggles checked / unchecked).
- State is saved to **localStorage** and restored on reload.
- State is per-device (shared iPad = shared checklist). Acceptable for a
  daily Lernzeit checklist.
- Checkmarks styled as hand-drawn ink ticks, not native checkboxes.

---

## ORIENTATION HANDLING (iPad Safari)

iPad Safari cannot force landscape on a normal website. Two-part solution:

1. **PWA manifest** with `"orientation": "landscape"`.
   - Add manifest, theme color, and home-screen icon so the site can be
     installed via "Add to Home Screen" and launched fullscreen in landscape.
2. **Rotate overlay (fallback)** for when the device is held in portrait
   (e.g. used as a plain browser tab, not installed):
   - Full-screen watercolor overlay with a hand-drawn "Please turn me
     sideways" illustration (rotating iPad doodle).
   - Triggered by a portrait orientation media query.
   - Hides automatically when rotated back to landscape.

---

## VIDEO REQUIREMENTS (animated water, any clips)

All autoplay video elements MUST have ALL of:

- `muted`
- `playsinline`   ← required, or iOS forces native fullscreen player
- `loop`
- `autoplay`
- `preload="auto"`

Format: **MP4 / H.264**. Keep clips short and small for the 60 FPS target.

---

## ASSET / PERFORMANCE NOTES (carried from main spec)

- Images: **WebP** with **PNG** fallback.
- Sticky notes and decorations need **transparent backgrounds**.
- Animations: **CSS transforms only.** No WebGL, no Three.js, no heavy canvas.
- Animated water: prototype BOTH a looping MP4 and a CSS/SVG shimmer on a
  real iPad; pick whichever holds 60 FPS.
- Art-style consistency: lock one watercolor reference/style up front and
  generate all ~40+ assets against it to avoid drift between units.
