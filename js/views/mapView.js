/**
 * Homepage map view — journey map per reference art, built from real
 * assets: ink route START → 1 → 2 → 3 → 4 → FINISH, unit stickers with
 * painted label plaques, compass, paper planes, sticky note, and the
 * Today's Plan notebook.
 */

import { UNITS } from "../data/units.js";
import { TODAYS_PLAN } from "../data/todaysPlan.js";
import { createChecklist } from "../components/checklist.js";

/** @param {HTMLElement} root */
export function renderMapView(root) {
  root.innerHTML = "";

  const view = document.createElement("div");
  view.className = "view map-view";

  // --- Ink route (bottom layer), hand-drawn dashed path ---
  // Two compositions: landscape (journey left→right) and portrait
  // (journey top→bottom); CSS shows one per orientation.
  view.insertAdjacentHTML(
    "beforeend",
    `<svg class="map-view__route map-view__route--landscape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="map-view__route-path"
        d="M 12 78
           C 20 84 32 80 40 72
           C 46 65 28 58 21 52
           C 14 45 40 27 54 24
           C 64 21 76 36 74 48
           C 72 60 80 66 86 72" />
    </svg>
    <svg class="map-view__route map-view__route--portrait" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path class="map-view__route-path"
        d="M 20 10
           C 32 13 50 16 56 21
           C 64 27 44 31 36 35
           C 26 40 54 47 60 50
           C 68 54 48 61 40 65
           C 30 71 42 80 50 86" />
    </svg>`
  );

  // --- Header: painted lettering logo + tagline ---
  const header = document.createElement("header");
  header.className = "map-view__header";

  const title = document.createElement("h1");
  title.className = "map-view__title";

  const logo = document.createElement("img");
  logo.className = "map-view__logo";
  logo.src = "assets/images/logo-english-explorer.webp";
  logo.alt = "English Explorer";
  logo.draggable = false;
  title.appendChild(logo);

  header.appendChild(title);
  view.appendChild(header);

  // --- Decor: paper planes, sticky note ---
  for (const n of [1, 2]) {
    const plane = document.createElement("img");
    plane.className = `map-view__plane map-view__plane--${n}`;
    plane.src = "assets/icons/paper-plane.png";
    plane.alt = "";
    plane.draggable = false;
    view.appendChild(plane);
  }

  // --- START / FINISH waypoints (captions overlay the painted art) ---
  // "START HERE!" is painted into the art itself — no caption needed
  const start = document.createElement("div");
  start.className = "map-view__waypoint map-view__waypoint--start";
  start.insertAdjacentHTML(
    "beforeend",
    `<img class="map-view__waypoint-art" src="assets/images/scene-start.webp" alt="" draggable="false">`
  );
  view.appendChild(start);

  const finish = document.createElement("div");
  finish.className = "map-view__waypoint map-view__waypoint--finish";
  finish.insertAdjacentHTML(
    "beforeend",
    `<img class="map-view__waypoint-art" src="assets/images/scene-finish.webp" alt="" draggable="false">
     <span class="map-view__waypoint-caption map-view__waypoint-caption--finish">FINISH!</span>`
  );
  view.appendChild(finish);

  // --- Unit stops: sticker scene + painted label plaque ---
  for (const unit of UNITS) {
    const stop = document.createElement("button");
    stop.className = "map-view__unit-stop";
    // CSS picks --x/--y (landscape) or --xp/--yp (portrait)
    stop.style.setProperty("--x", `${unit.mapPosition.x}%`);
    stop.style.setProperty("--y", `${unit.mapPosition.y}%`);
    stop.style.setProperty("--xp", `${unit.mapPositionPortrait.x}%`);
    stop.style.setProperty("--yp", `${unit.mapPositionPortrait.y}%`);
    stop.setAttribute("aria-label", `Open unit ${unit.number}: ${unit.label}`);

    const sticker = document.createElement("img");
    // Per-unit modifier drives the themed idle animation
    sticker.className = `map-view__unit-sticker map-view__unit-sticker--u${unit.number}`;
    sticker.src = unit.sticker;
    sticker.alt = "";
    sticker.draggable = false;

    const labelImg = document.createElement("img");
    // Per-unit modifier: units 1 and 4 get custom plaque placement
    labelImg.className = `map-view__unit-labelplate map-view__unit-labelplate--u${unit.number}`;
    labelImg.src = unit.labelImage;
    labelImg.alt = "";
    labelImg.draggable = false;

    stop.append(sticker, labelImg);
    stop.addEventListener("click", () => {
      window.location.hash = `/unit/${unit.id}`;
    });
    view.appendChild(stop);
  }

  // --- Today's Plan notebook (top-right) ---
  const plan = document.createElement("aside");
  plan.className = "map-view__plan";

  // Positions content on the notebook page, clear of spiral and edges
  const planPage = document.createElement("div");
  planPage.className = "map-view__plan-page";

  const planTitle = document.createElement("h2");
  planTitle.className = "map-view__plan-title";
  planTitle.textContent = "Today's Plan";

  planPage.append(planTitle, createChecklist(TODAYS_PLAN));
  plan.appendChild(planPage);
  view.appendChild(plan);

  root.appendChild(view);
}
