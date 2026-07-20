/**
 * Picture Vocabulary — a full-screen, hand-painted flashcard deck that
 * opens from the competence page (button above the Word Master button).
 *
 * Flow: a course chooser (GKurs / EKurs) → a 3-D cover-flow deck of
 * watercolour vocabulary cards (English word + German translation +
 * example, painted into each image). Browse with the arrows, click a
 * side card, or use the ← / → keys; Esc steps back (deck → chooser →
 * close). Rebuilt from the user's "ESL vocabulary deck" mockup in our
 * journal style, vanilla JS, no dependencies.
 *
 * @param {{
 *   title?: string,
 *   intro?: string,
 *   base: string,                       // folder holding <course.key>/NN.jpg
 *   courses: Array<{ key: string, name: string, tag: string, count: number }>,
 *   gap?: number,                       // px between card centres (deck spread)
 *   onClose?: () => void,
 * }} config
 * @returns {HTMLElement}
 */
export function createPictureVocab({ title = "Picture Vocabulary", intro, base, courses, gap = 210, onClose }) {
  const overlay = document.createElement("div");
  overlay.className = "picvocab";
  overlay.tabIndex = -1;

  const state = { view: "choose", course: null, index: 0 };

  // ---- Chooser -------------------------------------------------------
  const chooser = document.createElement("div");
  chooser.className = "picvocab__chooser";

  const eyebrow = document.createElement("div");
  eyebrow.className = "picvocab__eyebrow";
  eyebrow.innerHTML = `<span class="picvocab__rule"></span><span>Englisch · Vocabulary</span><span class="picvocab__rule"></span>`;

  const h1 = document.createElement("h1");
  h1.className = "picvocab__title";
  h1.textContent = title;

  const lead = document.createElement("p");
  lead.className = "picvocab__lead";
  lead.textContent = intro ?? "A hand-painted deck of English words with their German translations.";

  const hint = document.createElement("p");
  hint.className = "picvocab__hint";
  hint.textContent = "Choose your course to begin";

  const courseRow = document.createElement("div");
  courseRow.className = "picvocab__courses";
  courses
    .filter((c) => c.count > 0)
    .forEach((c) => {
      const b = document.createElement("button");
      b.className = "picvocab__course";
      b.innerHTML = `<span class="picvocab__course-name">${c.key.toUpperCase()}</span><span class="picvocab__course-sub">${c.name}</span>`;
      b.addEventListener("click", () => openDeck(c));
      courseRow.appendChild(b);
    });

  const chooserClose = document.createElement("button");
  chooserClose.className = "picvocab__back";
  chooserClose.innerHTML = `<span>←</span> Close`;
  chooserClose.addEventListener("click", () => close());

  chooser.append(chooserClose, eyebrow, h1, lead, hint, courseRow);

  // ---- Deck ----------------------------------------------------------
  const deck = document.createElement("div");
  deck.className = "picvocab__deck";

  const deckBack = document.createElement("button");
  deckBack.className = "picvocab__back";
  deckBack.innerHTML = `<span>←</span> Courses`;
  deckBack.addEventListener("click", () => toChooser());

  const deckHead = document.createElement("div");
  deckHead.className = "picvocab__deckhead";
  const deckTag = document.createElement("div");
  deckTag.className = "picvocab__tag";
  const deckName = document.createElement("h2");
  deckName.className = "picvocab__coursetitle";
  deckHead.append(deckTag, deckName);

  const stage = document.createElement("div");
  stage.className = "picvocab__stage";
  const cardLayer = document.createElement("div");
  cardLayer.className = "picvocab__cards";
  stage.appendChild(cardLayer);

  const prevBtn = document.createElement("button");
  prevBtn.className = "picvocab__nav picvocab__nav--prev";
  prevBtn.setAttribute("aria-label", "Previous card");
  prevBtn.textContent = "←";
  prevBtn.addEventListener("click", () => go(-1));

  const nextBtn = document.createElement("button");
  nextBtn.className = "picvocab__nav picvocab__nav--next";
  nextBtn.setAttribute("aria-label", "Next card");
  nextBtn.textContent = "→";
  nextBtn.addEventListener("click", () => go(1));

  stage.append(prevBtn, nextBtn);

  const counter = document.createElement("div");
  counter.className = "picvocab__counter";
  counter.innerHTML = `<span class="picvocab__rule picvocab__rule--sm"></span><span class="picvocab__count"></span><span class="picvocab__rule picvocab__rule--sm"></span>`;
  const countText = counter.querySelector(".picvocab__count");

  deck.append(deckBack, deckHead, stage, counter);

  overlay.append(chooser, deck);

  // ---- Behaviour -----------------------------------------------------
  let cardEls = [];
  let swipeGuard = false; // suppress the card tap that ends a swipe

  // Touch / pointer swipe — the main way to flip cards on an iPad, where
  // there is no keyboard. A horizontal drag past the threshold advances
  // the deck; a small movement is treated as a tap (card selection).
  let sx = 0, sy = 0, dragging = false;
  const SWIPE = 45;
  stage.addEventListener("pointerdown", (e) => {
    dragging = true;
    swipeGuard = false;
    sx = e.clientX;
    sy = e.clientY;
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy)) {
      swipeGuard = true; // this gesture was a swipe, not a tap
      go(dx < 0 ? 1 : -1);
      setTimeout(() => { swipeGuard = false; }, 0);
    }
  };
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", () => { dragging = false; });

  function buildCards(course) {
    cardLayer.innerHTML = "";
    cardEls = [];
    for (let i = 0; i < course.count; i++) {
      const card = document.createElement("button");
      card.className = "picvocab__card";
      const img = document.createElement("img");
      img.className = "picvocab__card-img";
      img.loading = i < 3 ? "eager" : "lazy";
      img.decoding = "async";
      img.alt = "";
      img.draggable = false;
      img.src = `${base}/${course.key}/${String(i + 1).padStart(2, "0")}.jpg`;
      card.appendChild(img);
      card.addEventListener("click", () => {
        if (swipeGuard || i === state.index) return;
        state.index = i;
        paintDeck();
      });
      cardLayer.appendChild(card);
      cardEls.push(card);
    }
  }

  function paintDeck() {
    const total = cardEls.length;
    cardEls.forEach((card, i) => {
      const off = i - state.index;
      const a = Math.abs(off);
      const visible = a <= 3;
      const x = off * gap;
      const scale = Math.max(0.6, 1 - a * 0.14);
      const ry = Math.max(-42, Math.min(42, off * -22));
      const opacity = visible ? Math.max(0, 1 - a * 0.26) : 0;
      const blur = a === 0 ? 0 : Math.min(3.5, a * 1.2);
      card.style.transform = `translate(-50%,-50%) translateX(${x}px) scale(${scale}) rotateY(${ry}deg)`;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - a);
      card.style.filter = a === 0 ? "none" : `brightness(${1 - a * 0.06}) blur(${blur}px)`;
      card.style.pointerEvents = visible ? "auto" : "none";
      card.classList.toggle("picvocab__card--active", a === 0);
    });
    countText.textContent = total
      ? `${String(state.index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
      : "";
    prevBtn.disabled = state.index === 0;
    nextBtn.disabled = state.index >= total - 1;
  }

  function go(dir) {
    const total = cardEls.length;
    state.index = Math.max(0, Math.min(total - 1, state.index + dir));
    paintDeck();
  }

  function openDeck(course) {
    state.view = "deck";
    state.course = course;
    state.index = 0;
    deckTag.textContent = course.tag;
    deckName.textContent = course.name;
    buildCards(course);
    paintDeck();
    overlay.classList.add("picvocab--deck");
  }

  function toChooser() {
    state.view = "choose";
    state.course = null;
    overlay.classList.remove("picvocab--deck");
  }

  function close() {
    overlay.classList.add("picvocab--closing");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      overlay.remove();
      onClose?.();
    };
    overlay.addEventListener("transitionend", finish, { once: true });
    setTimeout(finish, 400);
  }

  overlay.addEventListener("keydown", (e) => {
    if (state.view === "deck") {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      else if (e.key === "Escape") { e.preventDefault(); toChooser(); }
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  });

  return overlay;
}
