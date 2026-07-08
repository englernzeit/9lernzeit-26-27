/**
 * Answers store — the explorer's name and task answers, in
 * localStorage (no backend). The name is one per device; answers
 * are keyed per unit/section so every competence page keeps its own.
 *
 * Task content mounts later; inputs it renders should either call
 * `setAnswer` or carry a `data-answer-key` attribute (the PDF
 * builder picks live DOM values up by that attribute too).
 */

const NAME_KEY = "explorer:name";

/** @returns {string} */
export function getName() {
  try {
    return localStorage.getItem(NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

/** @param {string} name */
export function setName(name) {
  try {
    localStorage.setItem(NAME_KEY, name.trim());
  } catch {
    /* storage unavailable — name just won't persist */
  }
}

/**
 * @param {string} unitId
 * @param {string} sectionId
 */
function answersKey(unitId, sectionId) {
  return `explorer:answers:${unitId}:${sectionId}`;
}

/**
 * @param {string} unitId
 * @param {string} sectionId
 * @returns {Record<string, string>} e.g. { "step1-task2": "..." }
 */
export function getAnswers(unitId, sectionId) {
  try {
    return JSON.parse(localStorage.getItem(answersKey(unitId, sectionId)) ?? "{}");
  } catch {
    return {};
  }
}

/**
 * @param {string} unitId
 * @param {string} sectionId
 * @param {string} key    e.g. "step1-task2"
 * @param {string} value
 */
export function setAnswer(unitId, sectionId, key, value) {
  const all = getAnswers(unitId, sectionId);
  all[key] = value;
  try {
    localStorage.setItem(answersKey(unitId, sectionId), JSON.stringify(all));
  } catch {
    /* storage unavailable */
  }
}

/* --- Word Master score (X correct of N sentences) -------------- */

function wordMasterKey(unitId, sectionId) {
  return `explorer:wordmaster:${unitId}:${sectionId}`;
}

/**
 * @param {string} unitId
 * @param {string} sectionId
 * @returns {{correct: number, total: number} | null}
 */
export function getWordMasterScore(unitId, sectionId) {
  try {
    const raw = localStorage.getItem(wordMasterKey(unitId, sectionId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * @param {string} unitId
 * @param {string} sectionId
 * @param {{correct: number, total: number}} score
 */
export function setWordMasterScore(unitId, sectionId, score) {
  try {
    localStorage.setItem(wordMasterKey(unitId, sectionId), JSON.stringify(score));
  } catch {
    /* storage unavailable */
  }
}
