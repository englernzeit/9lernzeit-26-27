/**
 * Competence content registry.
 *
 * Every competence page shares the journal layout; this registry
 * supplies its content. Pages without content yet render the same
 * chrome with "coming soon" cards (build-in-stages rule).
 */

import readingReef from "./australia-reading-reef.js";
import writingCamp from "./australia-writing-camp.js";
import digitalFootprint from "./generation-like-digital-footprint.js";
import ifClauses from "./generation-like-if-clauses.js";
import jeromeInfluencer from "./generation-like-jerome-influencer.js";
import writtenDiscussion from "./generation-like-written-discussion.js";
import vocabulary from "./generation-like-vocabulary.js";
import speaking from "./generation-like-speaking.js";
import revision from "./generation-like-revision.js";

const CONTENT = {
  "australia/reading-reef": readingReef,
  "australia/writing-camp": writingCamp,
  "generation-like/digital-footprint": digitalFootprint,
  "generation-like/if-clauses": ifClauses,
  "generation-like/jerome-influencer": jeromeInfluencer,
  "generation-like/written-discussion": writtenDiscussion,
  "generation-like/vocabulary": vocabulary,
  "generation-like/speaking": speaking,
  "generation-like/revision": revision,
};

/**
 * @param {string} unitId
 * @param {string} sectionId
 * @returns {object | null}
 */
export function getCompetenceContent(unitId, sectionId) {
  return CONTENT[`${unitId}/${sectionId}`] ?? null;
}
