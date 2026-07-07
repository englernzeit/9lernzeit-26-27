/**
 * Today's Plan checklist component.
 *
 * Items are tappable; checked state persists via checklistStore
 * (localStorage) and is restored on reload. Ticks are hand-drawn ink
 * SVGs, not native checkboxes.
 */

import { isChecked, toggle } from "../state/checklistStore.js";

/**
 * @param {Array<{id: string, label: string}>} items - supplied later with content
 * @returns {HTMLElement}
 */
export function createChecklist(items) {
  const list = document.createElement("ul");
  list.className = "checklist";

  for (const item of items) {
    const li = document.createElement("li");
    li.className = "checklist__item";
    li.classList.toggle("is-checked", isChecked(item.id));

    const tick = document.createElement("span");
    tick.className = "checklist__tick";

    const tickImg = document.createElement("img");
    tickImg.className = "checklist__tick-img";
    tickImg.src = "assets/icons/tick-red.png"; // painted red tick
    tickImg.alt = "";
    tickImg.draggable = false;
    tick.appendChild(tickImg);

    const label = document.createElement("span");
    label.className = "checklist__label";
    label.textContent = item.label;

    li.append(tick, label);
    li.addEventListener("click", () => {
      const checked = toggle(item.id);
      li.classList.toggle("is-checked", checked);
    });

    list.appendChild(li);
  }

  return list;
}
