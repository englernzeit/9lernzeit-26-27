/**
 * Unit carousel — panel with the unit's 7 location buttons.
 * Each button routes to its (currently empty) section page.
 */

/**
 * @param {{id: string, label: string, sections: Array<{id: string, label: string}>}} unit
 * @returns {HTMLElement}
 */
export function createUnitCarousel(unit) {
  const carousel = document.createElement("div");
  carousel.className = "carousel";

  const list = document.createElement("ul");
  list.className = "carousel__locations";

  for (const section of unit.sections) {
    const item = document.createElement("li");

    const btn = document.createElement("button");
    btn.className = "carousel__location-btn";
    btn.textContent = section.label;
    btn.addEventListener("click", () => {
      window.location.hash = `/unit/${unit.id}/${section.id}`;
    });

    item.appendChild(btn);
    list.appendChild(item);
  }

  carousel.appendChild(list);
  return carousel;
}
