/**
 * Word Master — a full-screen vocabulary drill that opens from the
 * competence page (button symmetric to the "New words" sticker).
 *
 * Each item shows a German prompt (with the target word in bold) and
 * an English sentence with a gap to type. Answers self-check: a correct
 * entry turns green and locks. A live counter tracks "Correct: X / N",
 * and the score is reported back via onScore so the PDF can include it.
 *
 * Inspired by the Unit 4 Word Master reference; rebuilt in our journal
 * style, vanilla JS, no dependencies.
 */

/**
 * @param {{
 *   title: string,
 *   subtitle?: string,
 *   items: Array<{ de: string, en: string, answer: string, accept?: string[] }>,
 *   onScore?: (correct: number, total: number) => void,
 *   onClose?: () => void,
 * }} config
 * @returns {HTMLElement}
 */
export function createWordMaster({ title, subtitle, items, onScore, onClose }) {
  const overlay = document.createElement("div");
  overlay.className = "wordmaster";

  const sheet = document.createElement("div");
  sheet.className = "wordmaster__sheet";
  overlay.appendChild(sheet);

  // Header: back + title + live score
  const header = document.createElement("header");
  header.className = "wordmaster__header";

  const back = document.createElement("button");
  back.className = "wordmaster__back";
  back.textContent = "← Back";
  back.addEventListener("click", () => close());

  const titles = document.createElement("div");
  titles.className = "wordmaster__titles";
  const h = document.createElement("h1");
  h.className = "wordmaster__title";
  h.textContent = title;
  titles.appendChild(h);
  if (subtitle) {
    const s = document.createElement("p");
    s.className = "wordmaster__subtitle";
    s.textContent = subtitle;
    titles.appendChild(s);
  }

  const scoreBadge = document.createElement("div");
  scoreBadge.className = "wordmaster__score";

  header.append(back, titles, scoreBadge);
  sheet.appendChild(header);

  const list = document.createElement("ol");
  list.className = "wordmaster__list";
  sheet.appendChild(list);

  const solved = new Set();
  const total = items.length;

  const updateScore = () => {
    scoreBadge.textContent = `Correct: ${solved.size} / ${total}`;
    scoreBadge.classList.toggle("wordmaster__score--done", solved.size === total);
    onScore?.(solved.size, total);
  };

  items.forEach((item, i) => {
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
    const input = buildGap(en, item, () => {
      solved.add(i);
      updateScore();
    });

    body.append(de, en);
    li.append(num, body);
    list.appendChild(li);

    // Pre-fill nothing; learner types. (No persisted per-sentence text —
    // only the aggregate score is stored.)
    void input;
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

  function close() {
    overlay.classList.add("wordmaster--closing");
    overlay.addEventListener(
      "transitionend",
      () => {
        overlay.remove();
        onClose?.();
      },
      { once: true },
    );
    // Fallback if no transition fires
    setTimeout(() => {
      if (overlay.isConnected) {
        overlay.remove();
        onClose?.();
      }
    }, 400);
  }

  // Esc closes
  overlay.tabIndex = -1;
  overlay.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

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
  // Size the field to roughly the answer length
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
