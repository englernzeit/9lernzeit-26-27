/**
 * Competence content registry.
 *
 * Every competence page shares the journal layout; this registry
 * supplies its content. Pages without content yet render the same
 * chrome with "coming soon" cards (build-in-stages rule).
 */

import readingReef from "./australia-reading-reef.js";
import digitalFootprint from "./generation-like-digital-footprint.js";

const CONTENT = {
  "australia/reading-reef": readingReef,
  "generation-like/digital-footprint": digitalFootprint,
};

/**
 * @param {string} unitId
 * @param {string} sectionId
 * @returns {object | null}
 */
export function getCompetenceContent(unitId, sectionId) {
  return CONTENT[`${unitId}/${sectionId}`] ?? null;
}
