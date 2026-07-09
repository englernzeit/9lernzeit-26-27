/**
 * Unit / section configuration — single source of truth for navigation.
 *
 * Unit names, taglines, and map positions follow the main-page reference
 * art (journey: Start → 1 Australia → 2 Respect & Community →
 * 3 Looking Forward → 4 Generation Like → Finish).
 *
 * All four units are working shells (spec: build-in-stages rule).
 * Unit 1 (Australia) receives content first; sections stay empty
 * templates until content is supplied.
 *
 * `sections` are the 7 location buttons in each unit's carousel.
 * Placeholder ids/labels — replace with real locations per unit.
 */

const placeholderSections = () =>
  Array.from({ length: 7 }, (_, i) => ({
    id: `section-${i + 1}`,
    label: `Section ${i + 1}`,
  }));

export const UNITS = [
  {
    id: "australia",
    number: 1,
    label: "Australia",
    tagline: "Life Down Under",
    // Percent of map canvas, per reference art (center-bottom)
    mapPosition: { x: 42, y: 74 },
    mapPositionPortrait: { x: 58, y: 22 },
    sticker: "assets/images/sticker-unit1-australia.png",
    labelImage: "assets/images/label-unit1.png",
    // Unit page art (assets/images/unit1/)
    pageBackground: "assets/images/unit1/bg-clouds.png",
    banner: "assets/images/unit1/banner-australia.png",
    centerImage: "assets/images/unit1/island-australia.png",
    // 7 locations; pos = % of the unit page (landscape)
    sections: [
      { id: "reading-reef", label: "Reading Reef", card: "assets/images/unit1/card-reading.png", pos: { x: 21, y: 30 } },
      { id: "writing-camp", label: "Writing Camp", card: "assets/images/unit1/card-writing.png", pos: { x: 13, y: 57 } },
      { id: "vocabulary-beach", label: "Vocabulary Beach", card: "assets/images/unit1/card-vocabulary.png", pos: { x: 24, y: 84 } },
      { id: "grammar-station", label: "Grammar Station", card: "assets/images/unit1/card-grammar.png", pos: { x: 47, y: 88 } },
      { id: "listening-harbour", label: "Listening Harbour", card: "assets/images/unit1/card-listening.png", pos: { x: 86, y: 60 } },
      { id: "speaking-lookout", label: "Speaking Lookout", card: "assets/images/unit1/card-speaking.png", pos: { x: 72, y: 87 } },
      { id: "revision-summit", label: "Revision Summit", card: "assets/images/unit1/card-revision.png", pos: { x: 77, y: 27 } },
    ],
  },
  {
    id: "respect-community",
    number: 2,
    label: "Respect & Community",
    tagline: "",
    // Left-center (schoolyard scene)
    mapPosition: { x: 18, y: 50 },
    mapPositionPortrait: { x: 34, y: 37 },
    sticker: "assets/images/sticker-unit2-community.png",
    labelImage: "assets/images/label-unit2.png",
    sections: placeholderSections(),
  },
  {
    id: "looking-forward",
    number: 3,
    label: "Looking Forward",
    tagline: "Your future, your choice",
    // Center-top (mountains / signpost scene)
    mapPosition: { x: 56, y: 24 },
    mapPositionPortrait: { x: 62, y: 52 },
    sticker: "assets/images/sticker-unit3-forward.png",
    labelImage: "assets/images/label-unit3.png",
    sections: placeholderSections(),
  },
  {
    id: "generation-like",
    number: 4,
    label: "Generation Like",
    tagline: "Connect. Create. Care.",
    // Right (city / phone scene)
    mapPosition: { x: 75, y: 52 },
    mapPositionPortrait: { x: 38, y: 67 },
    sticker: "assets/images/sticker-unit4-generation.png",
    labelImage: "assets/images/label-unit4.png",
    // Competence pages built from the Unit 4 teaching material.
    // Only Reading has content so far; the rest render "coming soon".
    sections: [
      { id: "digital-footprint", label: "Reading · Digital Footprint" },
      { id: "jerome-influencer", label: "Listening · Jerome the Influencer" },
      { id: "if-clauses", label: "Grammar · If-Clauses" },
      { id: "written-discussion", label: "Writing · Written Discussion" },
      { id: "vocabulary", label: "Vocabulary" },
      { id: "speaking", label: "Speaking · Describe the Picture" },
      { id: "revision", label: "Revision" },
    ],
  },
];

/** @param {string} id */
export function getUnit(id) {
  return UNITS.find((unit) => unit.id === id) ?? null;
}

/**
 * @param {string} unitId
 * @param {string} sectionId
 */
export function getSection(unitId, sectionId) {
  const unit = getUnit(unitId);
  return unit?.sections.find((section) => section.id === sectionId) ?? null;
}
