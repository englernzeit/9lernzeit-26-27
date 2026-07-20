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
    sticker: "assets/images/sticker-unit1-australia.webp",
    labelImage: "assets/images/label-unit1.webp",
    // Unit page art (assets/images/unit1/)
    pageBackground: "assets/images/unit1/bg-clouds.jpg",
    banner: "assets/images/unit1/banner-australia.png",
    centerImage: "assets/images/unit1/island-australia.webp",
    // 5 locations; pos = % of the unit page (landscape).
    // Ringed symmetrically around the central island (mirror about x = 50),
    // top-center left clear for the banner.
    sections: [
      { id: "reading-reef", label: "Reading Reef", card: "assets/images/unit1/card-reading.webp", pos: { x: 17, y: 33 } },
      { id: "writing-camp", label: "Writing Camp", card: "assets/images/unit1/card-writing.webp", pos: { x: 14, y: 68 } },
      { id: "vocabulary-beach", label: "Vocabulary Beach", card: "assets/images/unit1/card-vocabulary.webp", pos: { x: 86, y: 68 } },
      { id: "grammar-station", label: "Grammar Station", card: "assets/images/unit1/card-grammar.webp", pos: { x: 50, y: 88 } },
      { id: "listening-harbour", label: "Listening Harbour", card: "assets/images/unit1/card-listening.webp", pos: { x: 83, y: 33 } },
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
    sticker: "assets/images/sticker-unit2-community.webp",
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
    sticker: "assets/images/sticker-unit3-forward.webp",
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
    sticker: "assets/images/sticker-unit4-generation.webp",
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
