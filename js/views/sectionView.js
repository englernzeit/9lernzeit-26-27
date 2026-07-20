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
import {
  createGlossaryText,
  createMultipleChoice,
  createGroupSort,
  createSentenceBuild,
  createGame,
  createProfileBuilder,
  createGapFill,
  createAudioPlayer,
  createImageMatch,
  createEventOrder,
  createInlineChoice,
  createCaptionBuilder,
  createPhraseReference,
  createMatchUp,
  createTapMatch,
  createArgumentPick,
  createParagraphBuilder,
  createEssayEditor,
  createEmailBuilder,
  createEmailFixer,
} from "../components/exercises.js";
import {
  getName,
  setName,
  getAnswers,
  setAnswer,
  getWordMasterScore,
  setWordMasterScore,
} from "../state/answersStore.js";
import { createWordMaster } from "../components/wordMaster.js";
import { createPictureVocab } from "../components/pictureVocab.js";
import { buildAnswerSheetPdf, downloadPdf } from "../utils/pdf.js";

/** The six fields of the Step 4 "dream profile" builder, in PDF order. */
const PROFILE_FIELDS = ["username", "bio", "post1", "post2", "post3", "nevershare"];
const PROFILE_LABELS = {
  username: "Username",
  bio: "Bio",
  post1: "Post 1",
  post2: "Post 2",
  post3: "Post 3",
  nevershare: "Never share",
};

/** The two fields of the "Sell It!" caption builder, in PDF order. */
const CAPTION_FIELDS = ["product", "caption"];
const CAPTION_LABELS = { product: "Product", caption: "Instagram caption" };

/** The six parts of the official-email builder, in PDF order. */
const EMAIL_FIELDS = ["subject", "dear", "reason", "q1", "q2", "name"];
const EMAIL_LABELS = {
  subject: "Subject",
  dear: "Dear …",
  reason: "I am writing because …",
  q1: "Could you please tell me …?",
  q2: "Could you also tell me …?",
  name: "Full name",
};

/** The corrected-email fields of the "Fix the email" task, in PDF order. */
const FIXER_FIELDS = ["subject", "body"];
const FIXER_LABELS = { subject: "Subject", body: "Corrected email" };

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
  title.textContent = content.title ?? section.label;
  const subtitle = document.createElement("p");
  subtitle.className = "journal__subtitle";
  subtitle.textContent = `${unit.label}${unit.tagline ? ` · ${unit.tagline}` : ""}`;
  plaque.append(title, subtitle);
  header.appendChild(plaque);

  header.appendChild(buildNamePdfCluster(view, unit, section, content));

  view.appendChild(header);

  const ctx = { unitId, sectionId };

  // --- Reading passage (optional) --------------------------------
  if (content.passage) {
    view.appendChild(buildPassage(content.passage));
  }

  // --- Grammar guide (optional) ----------------------------------
  if (content.guide) {
    view.appendChild(buildGuideSection(content.guide));
  }

  // --- Vocabulary hub (Picture Vocabulary + Word Master) ---------
  if (content.pictureVocab || content.wordMaster?.items?.length) {
    view.appendChild(buildVocabHub(content, ctx));
  }

  // --- Steps ------------------------------------------------------
  for (const step of content.steps) {
    view.appendChild(buildStepSection(step, ctx));
  }

  root.appendChild(view);
}

/* ================= reading passage ============================= */

/** @param {{title: string, lead?: string[], tipsTitle?: string, tips?: string[], closing?: string[]}} passage */
function buildPassage(passage) {
  const section = document.createElement("section");
  section.className = "journal__section";

  const article = document.createElement("article");
  article.className = "journal-passage";

  const h = document.createElement("h2");
  h.className = "journal-passage__title";
  h.textContent = passage.title;
  article.appendChild(h);

  (passage.lead ?? []).forEach((para, i) => {
    const p = document.createElement("p");
    p.className = "journal-passage__para";
    if (i === 0) p.classList.add("journal-passage__para--lead");
    p.textContent = para;
    article.appendChild(p);
  });

  if (passage.tips?.length) {
    if (passage.tipsTitle) {
      const th = document.createElement("h3");
      th.className = "journal-passage__subhead";
      th.textContent = passage.tipsTitle;
      article.appendChild(th);
    }
    const ol = document.createElement("ol");
    ol.className = "journal-passage__tips";
    for (const tip of passage.tips) {
      const li = document.createElement("li");
      li.className = "journal-passage__tip";
      const num = document.createElement("span");
      num.className = "journal-passage__tip-num";
      li.appendChild(num);
      const span = document.createElement("span");
      span.textContent = tip;
      li.appendChild(span);
      ol.appendChild(li);
    }
    article.appendChild(ol);
  }

  (passage.closing ?? []).forEach((para) => {
    const p = document.createElement("p");
    p.className = "journal-passage__para";
    p.textContent = para;
    article.appendChild(p);
  });

  section.appendChild(article);
  return section;
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

  // Only written / sentence-starter cards contribute to the PDF;
  // text, games and self-checking exercises are done in-app.
  const steps = content.steps
    .map((s) => ({
      heading: `Step ${s.step} — ${s.subtitle}`,
      items: s.cards.flatMap((card, i) => {
        const base = `step${s.step}-task${i + 1}`;
        if (card.type === "profile-builder") {
          return PROFILE_FIELDS.map((f) => ({
            label: `${card.title} — ${PROFILE_LABELS[f]}`,
            answer: answers[`${base}-profile-${f}`] ?? "",
          }));
        }
        if (card.type === "caption-builder") {
          return CAPTION_FIELDS.map((f) => ({
            label: `${card.title} — ${CAPTION_LABELS[f]}`,
            answer: answers[`${base}-caption-${f}`] ?? "",
          }));
        }
        if (card.type === "email-builder") {
          return EMAIL_FIELDS.map((f) => ({
            label: `${card.title} — ${EMAIL_LABELS[f]}`,
            answer: answers[`${base}-email-${f}`] ?? "",
          }));
        }
        if (card.type === "email-fixer") {
          return FIXER_FIELDS.map((f) => ({
            label: `${card.title} — ${FIXER_LABELS[f]}`,
            answer: answers[`${base}-fix-${f}`] ?? "",
          }));
        }
        if (card.type === "paragraph-builder") {
          return card.paragraph.sentences.map((sentence, k) => ({
            label: `${card.paragraph.title} — ${sentence.starter}`,
            answer: answers[`${base}-para-s${k}`] ?? "",
          }));
        }
        if (card.type === "essay-editor") {
          return [{ label: card.title, answer: answers[`${base}-essay`] ?? "" }];
        }
        if (card.starters?.length) {
          return card.starters.map((starter, k) => ({
            label: `${card.title}: ${starter}`,
            answer: answers[`${base}s${k + 1}`] ?? "",
          }));
        }
        if (card.answer) {
          return [{ label: card.title, answer: answers[base] ?? "" }];
        }
        return [];
      }),
    }))
    .filter((s) => s.items.length);

  // Word Master result, if the learner played it
  const wm = getWordMasterScore(unit.id, section.id);
  if (wm) {
    steps.unshift({
      heading: "Word Master",
      items: [{ label: "Sentences correct", answer: `${wm.correct} / ${wm.total}` }],
    });
  }

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

/* ================= Grammar guide =============================== */

/**
 * Reference panel shown once at the top of a grammar page: the three
 * conditional types (formula + example) plus an optional infographic.
 *
 * @param {{ subtitle?: string, label?: string, types: Array<{n:number,name:string,tag:string,accent:string,formula:string,example:string}>, infographic?: {src:string, alt:string, caption?:string} }} guide
 */
function buildGuideSection(guide) {
  const section = sectionShell("ochre", guide.label ?? "The 3 Types", guide.subtitle ?? "");

  const article = document.createElement("article");
  article.className = "grammar-guide";

  // Optional teaching video, full width above the reference cards.
  if (guide.video) {
    const figure = document.createElement("figure");
    figure.className = "grammar-guide__video";
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    if (guide.video.poster) video.poster = guide.video.poster;
    video.src = guide.video.src;
    figure.appendChild(video);
    if (guide.video.caption) {
      const cap = document.createElement("figcaption");
      cap.className = "grammar-guide__caption";
      cap.textContent = guide.video.caption;
      figure.appendChild(cap);
    }
    article.appendChild(figure);
  }

  const grid = document.createElement("div");
  // Without an infographic the reference cards tile across the full width.
  grid.className = guide.infographic ? "grammar-guide__grid" : "grammar-guide__grid grammar-guide__grid--full";

  const types = document.createElement("div");
  types.className = "grammar-guide__types";
  for (const t of guide.types) {
    const card = document.createElement("div");
    card.className = `grammar-guide__type grammar-guide__type--${t.accent}`;

    const head = document.createElement("div");
    head.className = "grammar-guide__type-head";
    const dot = document.createElement("span");
    dot.className = "grammar-guide__dot";
    const name = document.createElement("span");
    name.className = "grammar-guide__type-name";
    name.textContent = guide.numbered === false ? t.name : `Type ${t.n} — ${t.name}`;
    const tag = document.createElement("span");
    tag.className = "grammar-guide__tag";
    tag.textContent = t.tag;
    head.append(dot, name, tag);

    const formula = document.createElement("p");
    formula.className = "grammar-guide__formula";
    formula.textContent = t.formula;

    card.append(head, formula);

    // Optional German meaning line (with a DE badge).
    if (t.de) {
      const de = document.createElement("p");
      de.className = "grammar-guide__de";
      const badge = document.createElement("span");
      badge.className = "grammar-guide__de-badge";
      badge.textContent = "DE";
      de.append(badge, document.createTextNode(t.de));
      card.appendChild(de);
    }

    const example = document.createElement("p");
    example.className = "grammar-guide__example";
    example.textContent = `“${t.example}”`;
    card.appendChild(example);

    types.appendChild(card);
  }
  grid.appendChild(types);

  if (guide.infographic) {
    const figure = document.createElement("figure");
    figure.className = "grammar-guide__figure";
    const img = document.createElement("img");
    img.className = "grammar-guide__img";
    img.src = guide.infographic.src;
    img.alt = guide.infographic.alt ?? "";
    img.loading = "lazy";
    figure.appendChild(img);
    if (guide.infographic.caption) {
      const cap = document.createElement("figcaption");
      cap.className = "grammar-guide__caption";
      cap.textContent = guide.infographic.caption;
      figure.appendChild(cap);
    }
    grid.appendChild(figure);
  }

  article.appendChild(grid);

  // Optional 4-tenses revision table (tense · use · signal words), shown
  // below the reference cards.
  if (guide.tenses?.length) {
    const tbl = document.createElement("div");
    tbl.className = "grammar-guide__tenses";
    const cap = document.createElement("div");
    cap.className = "grammar-guide__tenses-cap";
    cap.textContent = guide.tensesLabel ?? "The 4 tenses — quick revision";
    tbl.appendChild(cap);
    for (const t of guide.tenses) {
      const row = document.createElement("div");
      row.className = "grammar-guide__tense";
      const nm = document.createElement("span");
      nm.className = "grammar-guide__tense-name";
      nm.textContent = t.tense;
      const use = document.createElement("span");
      use.className = "grammar-guide__tense-use";
      use.textContent = t.use;
      if (t.example) {
        const ex = document.createElement("span");
        ex.className = `grammar-guide__tense-ex grammar-guide__tense-ex--${t.accent ?? "olive"}`;
        ex.textContent = `“${t.example}”`;
        use.appendChild(ex);
      }
      const sig = document.createElement("span");
      sig.className = "grammar-guide__tense-sig";
      sig.textContent = t.signals;
      row.append(nm, use, sig);
      tbl.appendChild(row);
    }
    article.appendChild(tbl);
  }

  section.appendChild(article);
  return section;
}

/* ================= Vocabulary hub ============================== */

/**
 * The "Vocabulary" section: a centred stack of launcher buttons —
 * "Picture Vocabulary" (a full-screen hand-painted flashcard deck)
 * above "Word Master" (the gap-fill drill). Either button appears only
 * when the page supplies its data.
 *
 * @param {{pictureVocab?: object, wordMaster?: {subtitle?: string, items: Array}, vocab?: {subtitle?: string}}} content
 * @param {{unitId: string, sectionId: string}} ctx
 */
function buildVocabHub(content, ctx) {
  const section = sectionShell(
    "teal",
    "Vocabulary",
    content.vocab?.subtitle ?? "Learn the words for this page — browse the picture deck, then test yourself.",
  );

  const hub = document.createElement("div");
  hub.className = "vocab-hub";

  // Picture Vocabulary — sits above Word Master.
  if (content.pictureVocab?.courses?.some((c) => c.count > 0)) {
    const pv = content.pictureVocab;
    const picBtn = document.createElement("button");
    picBtn.className = "vocab-hub__btn";
    picBtn.setAttribute("aria-label", "Open the Picture Vocabulary flashcard deck");
    picBtn.innerHTML = `<span class="vocab-hub__btn-ico">🖼</span>Picture Vocabulary`;
    picBtn.addEventListener("click", () => {
      const overlay = createPictureVocab({
        title: pv.title ?? "Picture Vocabulary",
        intro: pv.intro,
        base: pv.base,
        courses: pv.courses,
        onClose: () => {},
      });
      document.body.appendChild(overlay);
      overlay.focus();
    });
    hub.appendChild(picBtn);
  }

  // Word Master — the gap-fill drill; score is saved and printed in the PDF.
  if (content.wordMaster?.items?.length) {
    const btn = document.createElement("button");
    btn.className = "journal__wordmaster-btn";
    btn.textContent = "Word Master";
    btn.setAttribute("aria-label", "Open the Word Master vocabulary game");

    const badge = document.createElement("span");
    badge.className = "journal__wordmaster-badge";
    const paintBadge = () => {
      const s = getWordMasterScore(ctx.unitId, ctx.sectionId);
      badge.textContent = s ? `${s.correct}/${s.total}` : "";
      badge.style.display = s ? "" : "none";
    };
    paintBadge();
    btn.appendChild(badge);

    btn.addEventListener("click", () => {
      const overlay = createWordMaster({
        title: "Word Master",
        subtitle: content.wordMaster.subtitle ?? "Complete the sentences with the right English word.",
        items: content.wordMaster.items,
        onScore: (correct, total) => {
          setWordMasterScore(ctx.unitId, ctx.sectionId, { correct, total });
        },
        onClose: paintBadge,
      });
      document.body.appendChild(overlay);
      overlay.focus();
    });

    hub.appendChild(btn);
  }

  section.appendChild(hub);
  return section;
}

/* ================= Step sections ================================ */

/**
 * @param {{step: number, subtitle: string, accent: string, layout: string, cards: Array}} step
 * @param {{unitId: string, sectionId: string}} ctx
 */
function buildStepSection(step, ctx) {
  const section = sectionShell(step.accent, `Step ${step.step}`, step.subtitle);

  // Task numbering skips text/game cards so writing tasks read 1, 2, 3…
  let taskNo = 0;
  const cards = step.cards.map((data, i) => {
    if (
      data.type !== "text" &&
      data.type !== "game" &&
      data.type !== "phrase-reference" &&
      data.type !== "video" &&
      data.type !== "image"
    )
      taskNo += 1;
    return buildCard(step, data, i, taskNo, ctx);
  });

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
 * One card, dispatched on `data.type`:
 *   text            → reading variant (tappable glossary if flagged)
 *   multiple-choice → self-checking MC test
 *   group-sort      → sort chips into bins, self-checking
 *   sentence-build  → order word tokens, self-checking
 *   game            → hangman placeholder (code later)
 *   written / —     → intro + optional lines + answer field
 *
 * @param {object} step
 * @param {object} data
 * @param {number} index
 * @param {number} taskNo
 * @param {{unitId: string, sectionId: string}} ctx
 */
function buildCard(step, data, index, taskNo, ctx) {
  const card = document.createElement("article");
  card.className = `taskcard taskcard--sheet taskcard--${step.accent}`;
  if (data.type === "game") card.classList.add("taskcard--game");

  const body = document.createElement("div");
  body.className = "taskcard__body";
  card.appendChild(body);

  // The game card is nothing but the game — no header, title or intro.
  if (data.type !== "game") {
    const head = document.createElement("div");
    head.className = "taskcard__head";
    const num = document.createElement("span");
    num.className = "taskcard__num";
    num.textContent =
      data.type === "text"
        ? "Text"
        : data.type === "video"
          ? "Video"
          : data.type === "image"
            ? "Model"
            : data.type === "phrase-reference"
              ? "Words"
              : `Task ${taskNo}`;
    const kind = document.createElement("span");
    kind.className = "taskcard__kind";
    kind.textContent = data.kind ?? "";
    head.append(num, kind);
    body.appendChild(head);

    if (data.title) {
      const title = document.createElement("h3");
      title.className = "taskcard__title";
      title.textContent = data.title;
      body.appendChild(title);
    }
    if (data.intro) {
      const intro = document.createElement("p");
      intro.className = "taskcard__intro";
      intro.textContent = data.intro;
      body.appendChild(intro);
    }
  }

  // Optional listening track above the task body.
  if (data.audio) {
    body.appendChild(createAudioPlayer(data.audio));
  }

  // Optional picture above the task body (e.g. Speaking picture-description).
  if (data.image) {
    body.appendChild(buildTaskFigure(data.image, data.imageAlt, data.imageCaption));
  }

  // Optional teaching video (e.g. Writing "Email Survival Guide" cards).
  if (data.video) {
    body.appendChild(buildTaskVideo(data.video));
  }

  switch (data.type) {
    case "video":
    case "image":
      break; // the video/image is rendered above; the card is just that

    case "text":
      body.appendChild(createGlossaryText({ paragraphs: normalizeParagraphs(data.paragraphs), highlight: data.highlight }));
      break;
    case "multiple-choice":
      body.appendChild(createMultipleChoice({ questions: data.questions, columns: data.columns }));
      break;
    case "group-sort":
      body.appendChild(createGroupSort({ groups: data.groups }));
      break;
    case "sentence-build":
      body.appendChild(createSentenceBuild({ sentences: data.sentences }));
      break;
    case "gap-fill":
      body.appendChild(createGapFill({ items: data.items }));
      break;
    case "image-match":
      body.appendChild(createImageMatch({ pairs: data.pairs }));
      break;
    case "event-order":
      body.appendChild(createEventOrder({ events: data.events }));
      break;
    case "inline-choice":
      body.appendChild(createInlineChoice(data));
      break;
    case "phrase-reference":
      body.appendChild(createPhraseReference({ sections: data.sections }));
      break;
    case "match-up":
      body.appendChild(createMatchUp({ options: data.options, items: data.items }));
      break;
    case "tap-match":
      body.appendChild(createTapMatch({ pairs: data.pairs, leftLabel: data.leftLabel, rightLabel: data.rightLabel }));
      break;
    case "argument-pick":
      body.appendChild(createArgumentPick({ args: data.args }));
      break;
    case "paragraph-builder": {
      const base = `step${step.step}-task${index + 1}`;
      const saved = ctx ? getAnswers(ctx.unitId, ctx.sectionId) : {};
      const keyFor = (k) => `${base}-para-s${k}`;
      body.appendChild(
        createParagraphBuilder({
          paragraph: data.paragraph,
          values: saved,
          keyFor,
          onChange: (k, v) => ctx && setAnswer(ctx.unitId, ctx.sectionId, keyFor(k), v),
        }),
      );
      break;
    }
    case "essay-editor": {
      const base = `step${step.step}-task${index + 1}`;
      const key = `${base}-essay`;
      const saved = ctx ? getAnswers(ctx.unitId, ctx.sectionId) : {};
      body.appendChild(
        createEssayEditor({
          min: data.min,
          max: data.max,
          placeholder: data.placeholder,
          checklist: data.checklist,
          chips: data.chips,
          subject: data.subject,
          value: saved[key] ?? "",
          answerKey: key,
          onChange: (v) => ctx && setAnswer(ctx.unitId, ctx.sectionId, key, v),
        }),
      );
      break;
    }
    case "game":
      body.appendChild(createGame(data));
      break;
    case "profile-builder": {
      const base = `step${step.step}-task${index + 1}-profile`;
      const saved = ctx ? getAnswers(ctx.unitId, ctx.sectionId) : {};
      const values = {};
      for (const f of PROFILE_FIELDS) values[f] = saved[`${base}-${f}`] ?? "";
      body.appendChild(
        createProfileBuilder({
          values,
          keyFor: (f) => `${base}-${f}`,
          onChange: (f, v) =>
            ctx && setAnswer(ctx.unitId, ctx.sectionId, `${base}-${f}`, v),
        }),
      );
      break;
    }
    case "caption-builder": {
      const base = `step${step.step}-task${index + 1}-caption`;
      const saved = ctx ? getAnswers(ctx.unitId, ctx.sectionId) : {};
      const values = {};
      for (const f of CAPTION_FIELDS) values[f] = saved[`${base}-${f}`] ?? "";
      body.appendChild(
        createCaptionBuilder({
          values,
          keyFor: (f) => `${base}-${f}`,
          onChange: (f, v) =>
            ctx && setAnswer(ctx.unitId, ctx.sectionId, `${base}-${f}`, v),
        }),
      );
      break;
    }
    case "email-builder": {
      const base = `step${step.step}-task${index + 1}-email`;
      const saved = ctx ? getAnswers(ctx.unitId, ctx.sectionId) : {};
      const values = {};
      for (const f of EMAIL_FIELDS) values[f] = saved[`${base}-${f}`] ?? "";
      body.appendChild(
        createEmailBuilder({
          to: data.to,
          values,
          keyFor: (f) => `${base}-${f}`,
          onChange: (f, v) =>
            ctx && setAnswer(ctx.unitId, ctx.sectionId, `${base}-${f}`, v),
        }),
      );
      break;
    }
    case "email-fixer": {
      const base = `step${step.step}-task${index + 1}-fix`;
      const saved = ctx ? getAnswers(ctx.unitId, ctx.sectionId) : {};
      const values = {};
      for (const f of FIXER_FIELDS) values[f] = saved[`${base}-${f}`] ?? "";
      values.flags = saved[`${base}-flags`] ?? "";
      body.appendChild(
        createEmailFixer({
          draft: data.draft,
          to: data.to,
          subjectPlaceholder: data.subjectPlaceholder,
          bodyPlaceholder: data.bodyPlaceholder,
          values,
          keyFor: (f) => `${base}-${f}`,
          onChange: (f, v) =>
            ctx && setAnswer(ctx.unitId, ctx.sectionId, `${base}-${f}`, v),
        }),
      );
      break;
    }
    default:
      appendWrittenBody(body, step, data, index, ctx);
  }

  if (data.help) {
    const help = document.createElement("div");
    help.className = "taskcard__help";
    help.textContent = data.help;
    body.appendChild(help);
  }

  return card;
}

/**
 * A framed picture inside a task card. If the image is missing (e.g. the
 * artwork hasn't been added yet), it degrades to a labelled placeholder so
 * the slot is still visible and the page never shows a broken image.
 */
function buildTaskFigure(src, alt, caption) {
  const figure = document.createElement("figure");
  figure.className = "taskcard__figure";

  const frame = document.createElement("div");
  frame.className = "taskcard__figure-frame";

  const img = document.createElement("img");
  img.className = "taskcard__figure-img";
  img.src = src;
  img.alt = alt ?? "";
  img.loading = "lazy";
  img.addEventListener("error", () => {
    frame.classList.add("taskcard__figure-frame--pending");
    img.remove();
    const ph = document.createElement("div");
    ph.className = "taskcard__figure-placeholder";
    ph.innerHTML = "<span>📷</span><span>Picture coming soon</span>";
    frame.appendChild(ph);
  });
  frame.appendChild(img);
  figure.appendChild(frame);

  if (caption) {
    const cap = document.createElement("figcaption");
    cap.className = "taskcard__figure-cap";
    cap.textContent = caption;
    figure.appendChild(cap);
  }
  return figure;
}

/** A teaching video inside a task card (controls, lazy metadata). */
function buildTaskVideo(video) {
  const figure = document.createElement("figure");
  figure.className = "taskcard__video";
  const el = document.createElement("video");
  el.controls = true;
  el.preload = "metadata";
  el.playsInline = true;
  if (video.poster) el.poster = video.poster;
  el.src = video.src;
  figure.appendChild(el);
  if (video.caption) {
    const cap = document.createElement("figcaption");
    cap.className = "taskcard__video-cap";
    cap.textContent = video.caption;
    figure.appendChild(cap);
  }
  return figure;
}

/** Written-task content: optional bullet/check lines + a saved answer field. */
function appendWrittenBody(body, step, data, index, ctx) {
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

  // Sentence starters — each becomes a "starter … [input]" row; the
  // learner completes five sentences. Replaces the single textarea.
  if (data.starters?.length && ctx) {
    const list = document.createElement("div");
    list.className = "taskcard__starters";
    data.starters.forEach((starter, k) => {
      const row = document.createElement("div");
      row.className = "taskcard__starter";
      const label = document.createElement("span");
      label.className = "taskcard__starter-label";
      label.textContent = starter;
      const key = `step${step.step}-task${index + 1}s${k + 1}`;
      const input = document.createElement("input");
      input.type = "text";
      input.className = "taskcard__starter-input";
      input.dataset.answerKey = key;
      const saved = getAnswers(ctx.unitId, ctx.sectionId)[key];
      if (saved) input.value = saved;
      input.addEventListener("input", () => {
        setAnswer(ctx.unitId, ctx.sectionId, key, input.value);
      });
      row.append(label, input);
      list.appendChild(row);
    });
    body.appendChild(list);
    return;
  }

  if (data.answer && ctx) {
    const key = `step${step.step}-task${index + 1}`;
    const area = document.createElement("textarea");
    area.className = "taskcard__answer";
    area.rows = data.lines?.length ? 4 : 3;
    area.placeholder = "Write your answer…";
    area.dataset.answerKey = key;
    const saved = getAnswers(ctx.unitId, ctx.sectionId)[key];
    if (saved) area.value = saved;
    area.addEventListener("input", () => {
      setAnswer(ctx.unitId, ctx.sectionId, key, area.value);
    });
    body.appendChild(area);
  }
}

/** A paragraph may be a plain string or an array of glossary segments. */
function normalizeParagraphs(paragraphs) {
  return (paragraphs ?? []).map((p) => (typeof p === "string" ? [p] : p));
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
