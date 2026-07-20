/**
 * Competence content registry.
 *
 * Every competence page shares the journal layout; this registry
 * supplies its content. Pages without content yet render the same
 * chrome with "coming soon" cards (build-in-stages rule).
 */

import readingReef from "./australia-reading-reef.js";
import writingCamp from "./australia-writing-camp.js";
import listeningHarbour from "./australia-listening-harbour.js";
import vocabularyBeach from "./australia-vocabulary-beach.js";
import grammarStation from "./australia-grammar-station.js";
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
  "australia/listening-harbour": listeningHarbour,
  "australia/vocabulary-beach": vocabularyBeach,
  "australia/grammar-station": grammarStation,
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

/**
 * True if any page in the unit ships a Picture Vocabulary deck. Word
 * Master is only offered in units that have picture vocabulary.
 * @param {string} unitId
 */
export function unitHasPictureVocab(unitId) {
  const prefix = `${unitId}/`;
  return Object.entries(CONTENT).some(
    ([key, content]) => key.startsWith(prefix) && content?.pictureVocab?.courses?.some((c) => c.count > 0),
  );
}
