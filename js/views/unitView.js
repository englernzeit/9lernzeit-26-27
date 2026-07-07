/**
 * Unit view.
 *
 * Units with full page art (banner/centerImage/cards) render the
 * "island layout": cloudy backdrop, painted title banner, central
 * island scene, and 7 location cards linked by dashed ink lines.
 * Units without art (2–4, build-in-stages rule) fall back to the
 * simple carousel shell.
 *
 * The router re-renders the whole shell per route, which guarantees
 * the spec's swap behaviour: panels never stack.
 */

import { getUnit } from "../data/units.js";
import { createUnitCarousel } from "../components/unitCarousel.js";
import { createBackTab } from "../components/backTab.js";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * @param {HTMLElement} root
 * @param {string} unitId
 */
export function renderUnitView(root, unitId) {
  const unit = getUnit(unitId);
  if (!unit) {
    window.location.hash = "/";
    return;
  }

  root.innerHTML = "";
  root.appendChild(unit.banner ? buildIslandView(unit) : buildCarouselView(unit));
}

/** Island layout — used by units with full page art. */
function buildIslandView(unit) {
  const view = document.createElement("div");
  view.className = "view unit-map";
  view.style.backgroundImage = `url("${unit.pageBackground}")`;

  view.appendChild(createBackTab("Back to Journey", "/"));

  // Dashed ink links island → cards (decor, under everything else)
  const links = document.createElementNS(SVG_NS, "svg");
  links.setAttribute("class", "unit-map__links");
  links.setAttribute("viewBox", "0 0 100 100");
  links.setAttribute("preserveAspectRatio", "none");
  links.setAttribute("aria-hidden", "true");
  for (const section of unit.sections) {
    const line = document.createElementNS(SVG_NS, "line");
    line.setAttribute("class", "unit-map__link");
    line.setAttribute("x1", "50");
    line.setAttribute("y1", "52");
    line.setAttribute("x2", String(section.pos.x));
    line.setAttribute("y2", String(section.pos.y));
    links.appendChild(line);
  }
  view.appendChild(links);

  const banner = document.createElement("img");
  banner.className = "unit-map__banner";
  banner.src = unit.banner;
  banner.alt = `${unit.label} — ${unit.tagline}`;
  banner.draggable = false;
  view.appendChild(banner);

  const island = document.createElement("img");
  island.className = "unit-map__island";
  island.src = unit.centerImage;
  island.alt = "";
  island.draggable = false;
  view.appendChild(island);

  // Location cards (labels are painted into the card art)
  const cards = document.createElement("div");
  cards.className = "unit-map__cards";
  for (const section of unit.sections) {
    const card = document.createElement("button");
    card.className = `unit-map__card unit-map__card--${section.id}`;
    card.style.setProperty("--x", `${section.pos.x}%`);
    card.style.setProperty("--y", `${section.pos.y}%`);
    card.setAttribute("aria-label", `Open: ${section.label}`);

    const img = document.createElement("img");
    img.className = "unit-map__card-img";
    img.src = section.card;
    img.alt = "";
    img.draggable = false;

    card.appendChild(img);
    card.addEventListener("click", () => {
      window.location.hash = `/unit/${unit.id}/${section.id}`;
    });
    cards.appendChild(card);
  }
  view.appendChild(cards);

  return view;
}

/** Carousel shell — units whose content arrives later. */
function buildCarouselView(unit) {
  const view = document.createElement("div");
  view.className = "view unit-view";

  view.appendChild(createBackTab("Back to Map", "/"));

  const title = document.createElement("h1");
  title.className = "unit-view__title";
  title.textContent = `${unit.number}. ${unit.label}`;
  view.appendChild(title);

  if (unit.tagline) {
    const tagline = document.createElement("p");
    tagline.className = "unit-view__tagline";
    tagline.textContent = unit.tagline;
    view.appendChild(tagline);
  }

  view.appendChild(createUnitCarousel(unit));
  return view;
}
