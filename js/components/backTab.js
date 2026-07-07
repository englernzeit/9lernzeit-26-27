/**
 * Back tab — torn-paper / masking-tape "Back to …" affordance.
 * No browser-style chrome (per spec).
 */

/**
 * @param {string} label - e.g. "Back to Map", "Back to Australia"
 * @param {string} targetPath - hash route to navigate to
 * @returns {HTMLButtonElement}
 */
export function createBackTab(label, targetPath) {
  const tab = document.createElement("button");
  tab.className = "back-tab";
  tab.textContent = label;
  tab.addEventListener("click", () => {
    window.location.hash = targetPath;
  });
  return tab;
}
