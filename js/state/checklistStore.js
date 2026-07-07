/**
 * Today's Plan checklist store — the ONLY use of localStorage in the app
 * (per spec). State is per-device; a shared iPad shares the checklist.
 *
 * Shape in storage: { [itemId: string]: true } — only checked items stored.
 */

const STORAGE_KEY = "english-explorer.todays-plan";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** @param {string} itemId */
export function isChecked(itemId) {
  return Boolean(load()[itemId]);
}

/**
 * Toggle an item and persist.
 * @param {string} itemId
 * @returns {boolean} new checked state
 */
export function toggle(itemId) {
  const state = load();
  if (state[itemId]) {
    delete state[itemId];
  } else {
    state[itemId] = true;
  }
  save(state);
  return Boolean(state[itemId]);
}

/** Clear the whole checklist (e.g. for a new day). */
export function reset() {
  localStorage.removeItem(STORAGE_KEY);
}
