/**
 * Word Master — a full-screen vocabulary drill that opens from the
 * competence page (button beside Picture Vocabulary).
 *
 * The words match the page's Picture Vocabulary cards and are split by
 * course: opening Word Master shows a GKurs / EKurs chooser (when more
 * than one course is supplied), then that course's gap-fills. Each item
 * shows a German prompt (target word in bold) and an English sentence
 * with a gap to type. Answers self-check: a correct entry turns green
 * and locks. A live counter tracks "Correct: X / N", and the score is
 * reported back per course via onScore so the PDF can include it.
 *
 * Vanilla JS, no dependencies.
 */

/**
 * @param {{
 *   title?: string,
 *   courses: Array<{
 *     key: string, name: string, tag: string, subtitle?: string,
 *     items: Array<{ de: string, en: string, answer: string, accept?: string[] }>,
 *   }>,
 *   onScore?: (courseKey: string, correct: number, total: number) => void,
 *   onClose?: () => void,
 * }} config
 * @returns {HTMLElement}
 */
export function createWordMaster({ title = "Word Master", courses, onScore, onClose }) {
  const overlay = document.createElement("div");
  overlay.className = "wordmaster";
  overlay.tabIndex = -1;

  const usable = courses.filter((c) => c.items?.length);
  const multi = usable.length > 1;

  // ---- Chooser (only shown when there is more than one course) -------
  const chooser = document.createElement("div");
  chooser.className = "wordmaster__chooser";

  const chooserClose = document.createElement("button");
  chooserClose.className = "wordmaster__back wordmaster__back--corner";
  chooserClose.textContent = "← Close";
  chooserClose.addEventListener("click", () => close());

  const eyebrow = document.createElement("div");
  eyebrow.className = "wordmaster__eyebrow";
  eyebrow.innerHTML = `<span class="wordmaster__rule"></span><span>Englisch · Word Master</span><span class="wordmaster__rule"></span>`;

  const chTitle = document.createElement("h1");
  chTitle.className = "wordmaster__choose-title";
  chTitle.textContent = title;

  const chHint = document.createElement("p");
  chHint.className = "wordmaster__choose-hint";
  chHint.textContent = "Choose your course to begin";

  const courseRow = document.createElement("div");
  courseRow.className = "wordmaster__courses";
  usable.forEach((c) => {
    const b = document.createElement("button");
    b.className = "wordmaster__course";
    b.innerHTML = `<span class="wordmaster__course-name">${c.key.toUpperCase()}</span><span class="wordmaster__course-sub">${c.name}</span>`;
    b.addEventListener("click", () => openDrill(c));
    courseRow.appendChild(b);
  });

  chooser.append(chooserClose, eyebrow, chTitle, chHint, courseRow);

  // ---- Drill wrapper -------------------------------------------------
  const drillWrap = document.createElement("div");
  drillWrap.className = "wordmaster__drill";

  overlay.append(chooser, drillWrap);

  /** Build the gap-fill sheet for one course. */
  function buildDrill(course) {
    const sheet = document.createElement("div");
    sheet.className = "wordmaster__sheet";

    const header = document.createElement("header");
    header.className = "wordmaster__header";

    const back = document.createElement("button");
    back.className = "wordmaster__back";
    back.textContent = multi ? "← Courses" : "← Back";
    back.addEventListener("click", () => (multi ? toChooser() : close()));

    const titles = document.createElement("div");
    titles.className = "wordmaster__titles";
    const h = document.createElement("h1");
    h.className = "wordmaster__title";
    h.textContent = multi ? course.tag : title;
    titles.appendChild(h);
    const subText = course.subtitle ?? "Complete each sentence with the right English word.";
    const s = document.createElement("p");
    s.className = "wordmaster__subtitle";
    s.textContent = subText;
    titles.appendChild(s);

    const scoreBadge = document.createElement("div");
    scoreBadge.className = "wordmaster__score";

    header.append(back, titles, scoreBadge);
    sheet.appendChild(header);

    const list = document.createElement("ol");
    list.className = "wordmaster__list";
    sheet.appendChild(list);

    const solved = new Set();
    const total = course.items.length;

    const updateScore = () => {
      scoreBadge.textContent = `Correct: ${solved.size} / ${total}`;
      scoreBadge.classList.toggle("wordmaster__score--done", solved.size === total);
      onScore?.(course.key, solved.size, total);
    };

    course.items.forEach((item, i) => {
      const li = document.createElement("li");
      li.className = "wordmaster__item";

      const num = document.createElement("span");
      num.className = "wordmaster__num";
      num.textContent = String(i + 1);

      const body = document.createElement("div");
      body.className = "wordmaster__item-body";

      const de = document.createElement("p");
      de.className = "wordmaster__de";
      renderBold(de, item.de);

      const en = document.createElement("p");
      en.className = "wordmaster__en";
      buildGap(en, item, () => {
        solved.add(i);
        updateScore();
      });

      body.append(de, en);
      li.append(num, body);
      list.appendChild(li);
    });

    const footer = document.createElement("div");
    footer.className = "wordmaster__footer";
    const reset = document.createElement("button");
    reset.className = "wordmaster__reset";
    reset.textContent = "Reset all answers";
    reset.addEventListener("click", () => {
      solved.clear();
      list.querySelectorAll(".wordmaster__gap").forEach((el) => {
        el.value = "";
        el.disabled = false;
        el.classList.remove("wordmaster__gap--right");
      });
      updateScore();
    });
    footer.appendChild(reset);
    sheet.appendChild(footer);

    updateScore();
    return sheet;
  }

  function openDrill(course) {
    drillWrap.innerHTML = "";
    drillWrap.appendChild(buildDrill(course));
    overlay.classList.add("wordmaster--drill");
    overlay.scrollTop = 0;
  }

  function toChooser() {
    overlay.classList.remove("wordmaster--drill");
  }

  function close() {
    overlay.classList.add("wordmaster--closing");
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
    if (e.key !== "Escape") return;
    if (multi && overlay.classList.contains("wordmaster--drill")) toChooser();
    else close();
  });

  // Single course: skip the chooser entirely.
  if (!multi && usable.length === 1) openDrill(usable[0]);

  return overlay;
}

/** Render text with **bold** spans into `el`. */
function renderBold(el, text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  parts.forEach((part, i) => {
    if (i % 2 === 1) {
      const b = document.createElement("strong");
      b.textContent = part;
      el.appendChild(b);
    } else if (part) {
      el.appendChild(document.createTextNode(part));
    }
  });
}

/**
 * Split an English sentence on the "___" gap and insert a self-checking
 * input. Returns the input element.
 */
function buildGap(el, item, onSolved) {
  const [before, after = ""] = item.en.split("___");
  const accepted = [item.answer, ...(item.accept ?? [])].map(norm);

  el.appendChild(document.createTextNode(before));

  const input = document.createElement("input");
  input.type = "text";
  input.className = "wordmaster__gap";
  input.autocomplete = "off";
  input.autocapitalize = "off";
  input.spellcheck = false;
  input.setAttribute("aria-label", "Type the missing word");
  input.style.width = `${Math.max(4, item.answer.length + 1)}ch`;

  const check = () => {
    if (accepted.includes(norm(input.value))) {
      input.classList.add("wordmaster__gap--right");
      input.disabled = true;
      onSolved();
    }
  };
  input.addEventListener("input", check);
  input.addEventListener("blur", check);

  el.appendChild(input);
  el.appendChild(document.createTextNode(after));
  return input;
}

const norm = (s) => (s ?? "").trim().toLowerCase().replace(/\s+/g, " ");
