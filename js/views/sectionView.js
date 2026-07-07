/**
 * Competence page — watercolor travel-journal design (handoff 2a).
 *
 * Structure (top to bottom):
 *   header  — back sticky note · title plaque · Name + round PDF badge
 *   New words — postcard-stack carousel, loops infinitely
 *   Step 1  — side-slide carousel (LE: pictures + German help)
 *   Step 2  — journal-spread carousel (G-Kurs)
 *   Step 3  — journal-spread carousel (E-Kurs)
 *   Step 4  — single Check-out card with self-check boxes
 *
 * Content comes from js/data/competences; pages without content yet
 * render the same chrome with a "coming soon" card per step.
 * Striped areas are placeholders for watercolor illustrations.
 */

import { getUnit, getSection } from "../data/units.js";
import { getCompetenceContent } from "../data/competences/index.js";
import { createBackTab } from "../components/backTab.js";
import { createJournalCarousel } from "../components/journalCarousel.js";
import { getName, setName, getAnswers } from "../state/answersStore.js";
import { buildAnswerSheetPdf, downloadPdf } from "../utils/pdf.js";

/** Fallback shape for pages whose lesson content is not written yet. */
function comingSoonContent() {
  const card = (kind) => ({
    kind,
    title: "Coming soon…",
    intro: "This task is being prepared.",
    lines: [],
    help: "",
  });
  return {
    newWords: null,
    steps: [
      { step: 1, subtitle: "Mit Bildern und Hilfe auf Deutsch", accent: "coral", layout: "slide", cards: [card("Lesen · Text")] },
      { step: 2, subtitle: "G-Kurs", accent: "olive", layout: "spread", cards: [card("Aufgabe")] },
      { step: 3, subtitle: "E-Kurs", accent: "slate", layout: "spread", cards: [card("Aufgabe")] },
      { step: 4, subtitle: "Check-out", accent: "ochre", layout: "single", cards: [{ ...card("Check-out · Selbstcheck"), checklist: true }] },
    ],
  };
}

/**
 * @param {HTMLElement} root
 * @param {string} unitId
 * @param {string} sectionId
 */
export function renderSectionView(root, unitId, sectionId) {
  const unit = getUnit(unitId);
  const section = getSection(unitId, sectionId);
  if (!unit || !section) {
    window.location.hash = "/";
    return;
  }

  const content = getCompetenceContent(unitId, sectionId) ?? comingSoonContent();

  root.innerHTML = "";

  const view = document.createElement("div");
  view.className = "view journal";

  // --- Header ---------------------------------------------------
  const header = document.createElement("header");
  header.className = "journal__header";

  header.appendChild(createBackTab(`Back to ${unit.label}`, `/unit/${unit.id}`));

  const plaque = document.createElement("div");
  plaque.className = "journal__plaque";
  const title = document.createElement("h1");
  title.className = "journal__title";
  title.textContent = section.label;
  const subtitle = document.createElement("p");
  subtitle.className = "journal__subtitle";
  subtitle.textContent = `${unit.label}${unit.tagline ? ` · ${unit.tagline}` : ""}`;
  plaque.append(title, subtitle);
  header.appendChild(plaque);

  header.appendChild(buildNamePdfCluster(view, unit, section, content));

  view.appendChild(header);

  // --- New words (optional) --------------------------------------
  if (content.newWords) {
    view.appendChild(buildNewWordsSection(content.newWords));
  }

  // --- Steps ------------------------------------------------------
  for (const step of content.steps) {
    view.appendChild(buildStepSection(step));
  }

  root.appendChild(view);
}

/* ================= header: Name + PDF ========================== */

/**
 * @param {HTMLElement} view
 * @param {object} unit
 * @param {object} section
 * @param {object} content
 */
function buildNamePdfCluster(view, unit, section, content) {
  const cluster = document.createElement("div");
  cluster.className = "journal__id-cluster";

  const nameTag = document.createElement("label");
  nameTag.className = "journal__nametag";
  const caption = document.createElement("span");
  caption.className = "journal__nametag-caption";
  caption.textContent = "Name:";
  const input = document.createElement("input");
  input.className = "journal__nametag-input";
  input.type = "text";
  input.maxLength = 60;
  input.autocomplete = "name";
  input.value = getName();
  nameTag.append(caption, input);

  const pdf = document.createElement("button");
  pdf.className = "journal__pdf-badge";
  pdf.textContent = "PDF";
  pdf.setAttribute("aria-label", "Download your answers as a PDF");

  const hint = document.createElement("span");
  hint.className = "journal__pdf-hint";
  hint.textContent = "Please enter your name first!";

  input.addEventListener("input", () => {
    setName(input.value);
    input.classList.remove("journal__nametag-input--missing");
    hint.classList.remove("journal__pdf-hint--show");
  });

  pdf.addEventListener("click", () => {
    const name = input.value.trim();
    if (!name) {
      input.classList.add("journal__nametag-input--missing");
      hint.classList.add("journal__pdf-hint--show");
      input.focus();
      return;
    }
    downloadAnswerSheet(view, unit, section, content, name);
  });

  cluster.append(nameTag, pdf, hint);
  return cluster;
}

/**
 * @param {HTMLElement} view
 * @param {object} unit
 * @param {object} section
 * @param {object} content
 * @param {string} name
 */
function downloadAnswerSheet(view, unit, section, content, name) {
  const answers = getAnswers(unit.id, section.id);
  for (const el of view.querySelectorAll("[data-answer-key]")) {
    const value = /** @type {HTMLInputElement} */ (el).value ?? el.textContent;
    if (value && value.trim()) answers[el.dataset.answerKey] = value;
  }

  const steps = content.steps.map((s) => ({
    heading: `Step ${s.step} — ${s.subtitle}`,
    items: s.cards.map((card, i) => ({
      label: `Task ${i + 1} · ${card.title}`,
      answer: answers[`step${s.step}-task${i + 1}`] ?? "",
    })),
  }));

  const blob = buildAnswerSheetPdf({
    title: `${section.label} — Answer Sheet`,
    subtitle: `English Explorer · Unit ${unit.number}: ${unit.label}`,
    name,
    date: new Date().toLocaleDateString("de-DE"),
    steps,
  });

  const safe = (s) => s.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "");
  downloadPdf(blob, `${safe(section.label)}_${safe(name)}.pdf`);
}

/* ================= New words section =========================== */

/** @param {{subtitle: string, stampLabel: string, words: Array}} newWords */
function buildNewWordsSection(newWords) {
  const section = sectionShell("teal", "New words", newWords.subtitle);

  const cards = newWords.words.map((word, i) => {
    const card = document.createElement("article");
    card.className = "wordcard";

    const main = document.createElement("div");
    main.className = "wordcard__main";

    const eyebrow = document.createElement("div");
    eyebrow.className = "wordcard__eyebrow";
    eyebrow.textContent = `Word ${i + 1}`;

    const en = document.createElement("div");
    en.className = "wordcard__en";
    en.textContent = word.en;

    const de = document.createElement("div");
    de.className = "wordcard__de";
    de.textContent = word.de;

    const ex = document.createElement("div");
    ex.className = "wordcard__ex";
    ex.textContent = word.ex;

    main.append(eyebrow, en, de, ex);

    const side = document.createElement("div");
    side.className = "wordcard__side";

    const stamp = document.createElement("div");
    stamp.className = "wordcard__stamp";
    const stampArt = document.createElement("div");
    stampArt.className = "journal-artslot journal-artslot--teal";
    stampArt.textContent = "акварель: слово";
    stamp.appendChild(stampArt);

    const postmark = document.createElement("div");
    postmark.className = "wordcard__postmark";
    const pmLabel = document.createElement("span");
    pmLabel.className = "wordcard__postmark-label";
    pmLabel.textContent = newWords.stampLabel;
    const pmNum = document.createElement("span");
    pmNum.className = "wordcard__postmark-num";
    pmNum.textContent = `№ ${i + 1}`;
    postmark.append(pmLabel, pmNum);

    side.append(stamp, postmark);
    card.append(main, side);
    return card;
  });

  section.appendChild(createJournalCarousel({ mode: "stack", accent: "teal", cards }));
  return section;
}

/* ================= Step sections ================================ */

/** @param {{step: number, subtitle: string, accent: string, layout: string, cards: Array}} step */
function buildStepSection(step) {
  const section = sectionShell(step.accent, `Step ${step.step}`, step.subtitle);

  const cards = step.cards.map((cardData, i) =>
    step.layout === "slide"
      ? buildNoteCard(step, cardData, i)
      : buildSpreadCard(step, cardData, i),
  );

  if (step.layout === "single") {
    const holder = document.createElement("div");
    holder.className = "jcar jcar--single";
    const stage = document.createElement("div");
    stage.className = "jcar__stage";
    stage.appendChild(cards[0]);
    holder.appendChild(stage);
    section.appendChild(holder);
  } else {
    section.appendChild(
      createJournalCarousel({ mode: step.layout, accent: step.accent, cards }),
    );
  }

  return section;
}

/**
 * Step 1 card — note style: text left, small image slot top-right.
 * @param {object} step
 * @param {object} data
 * @param {number} index
 */
function buildNoteCard(step, data, index) {
  const card = document.createElement("article");
  card.className = `taskcard taskcard--note taskcard--${step.accent}`;

  const art = document.createElement("div");
  art.className = `taskcard__corner-art journal-artslot journal-artslot--${step.accent}`;
  art.textContent = "акварель: картинка к заданию";
  card.appendChild(art);

  card.appendChild(taskCardBody(step, data, index));
  return card;
}

/**
 * Steps 2–4 card — journal spread: illustration column left, text right.
 * @param {object} step
 * @param {object} data
 * @param {number} index
 */
function buildSpreadCard(step, data, index) {
  const card = document.createElement("article");
  card.className = `taskcard taskcard--spread taskcard--${step.accent}`;

  const art = document.createElement("div");
  art.className = `taskcard__side-art journal-artslot journal-artslot--${step.accent}`;
  art.textContent =
    step.layout === "single" ? "акварель: финальная иллюстрация" : "акварель: иллюстрация задания";
  card.appendChild(art);

  card.appendChild(taskCardBody(step, data, index));
  return card;
}

/**
 * Shared task-card content: Task N + kind, title, intro, lines
 * (bullets or self-check boxes), optional German help.
 *
 * @param {object} step
 * @param {object} data
 * @param {number} index
 */
function taskCardBody(step, data, index) {
  const body = document.createElement("div");
  body.className = "taskcard__body";

  const head = document.createElement("div");
  head.className = "taskcard__head";
  const num = document.createElement("span");
  num.className = "taskcard__num";
  num.textContent = `Task ${index + 1}`;
  const kind = document.createElement("span");
  kind.className = "taskcard__kind";
  kind.textContent = data.kind ?? "";
  head.append(num, kind);

  const title = document.createElement("h3");
  title.className = "taskcard__title";
  title.textContent = data.title;

  const intro = document.createElement("p");
  intro.className = "taskcard__intro";
  intro.textContent = data.intro ?? "";

  body.append(head, title, intro);

  if (data.lines?.length) {
    const lines = document.createElement("div");
    lines.className = "taskcard__lines";
    for (const text of data.lines) {
      const row = document.createElement("div");
      row.className = "taskcard__line";
      const marker = document.createElement("span");
      marker.className = data.checklist ? "taskcard__checkbox" : "taskcard__bullet";
      const span = document.createElement("span");
      span.textContent = text;
      row.append(marker, span);
      lines.appendChild(row);
    }
    body.appendChild(lines);
  }

  if (data.help) {
    const help = document.createElement("div");
    help.className = "taskcard__help";
    help.textContent = data.help;
    body.appendChild(help);
  }

  return body;
}

/* ================= shared chrome ================================ */

/**
 * Section shell: skewed label swatch + khaki subtitle.
 * @param {string} accent
 * @param {string} label
 * @param {string} subtitle
 */
function sectionShell(accent, label, subtitle) {
  const section = document.createElement("section");
  section.className = "journal__section";

  const head = document.createElement("div");
  head.className = "journal__section-head";

  const swatch = document.createElement("span");
  swatch.className = `journal__swatch journal__swatch--${accent}`;
  swatch.textContent = label;

  const sub = document.createElement("span");
  sub.className = "journal__section-sub";
  sub.textContent = subtitle ?? "";

  head.append(swatch, sub);
  section.appendChild(head);
  return section;
}
