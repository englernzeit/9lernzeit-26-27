/**
 * Back tab — a kraft-paper luggage tag pointing back ("Back to …").
 * No browser-style chrome (per spec).
 */

const ARROW_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M14.5 5.5 8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/**
 * @param {string} label - e.g. "Back to Map", "Back to Australia"
 * @param {string} targetPath - hash route to navigate to
 * @returns {HTMLButtonElement}
 */
export function createBackTab(label, targetPath) {
  const tab = document.createElement("button");
  tab.className = "back-tab";
  tab.type = "button";
  tab.setAttribute("aria-label", label);

  const arrow = document.createElement("span");
  arrow.className = "back-tab__arrow";
  arrow.innerHTML = ARROW_SVG;

  // "Back to Australia" → small "BACK TO" + the place name in handwriting
  const text = document.createElement("span");
  text.className = "back-tab__text";
  const m = /^back to\s+(.+)$/i.exec(label);
  const eyebrow = document.createElement("span");
  eyebrow.className = "back-tab__eyebrow";
  eyebrow.textContent = m ? "Back to" : "Back";
  const place = document.createElement("span");
  place.className = "back-tab__place";
  place.textContent = m ? m[1] : label;
  text.append(eyebrow, place);

  tab.append(arrow, text);
  tab.addEventListener("click", () => {
    window.location.hash = targetPath;
  });
  return tab;
}
