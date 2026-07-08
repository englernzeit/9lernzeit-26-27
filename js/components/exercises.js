/**
 * Interactive exercise widgets for competence pages — vanilla JS,
 * each self-checking with immediate feedback. Rebuilt from the Unit 4
 * material (see memory: unit4-material-is-direction-not-spec).
 *
 * Every factory returns a DOM element the card renderer drops in.
 * Journal styling lives in css/components/exercises.css.
 */

/* ---------- Tappable-glossary reading text (Step 1) ------------ */

/**
 * Reading text whose flagged words reveal a German translation on tap.
 * paragraphs: array of segment-arrays; a segment is a plain string or
 * `{ w: "footprint", de: "der Fußabdruck" }`.
 *
 * @param {{ paragraphs: Array<Array<string|{w:string,de:string}>> }} data
 */
export function createGlossaryText({ paragraphs }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-glossary";

  // Only show the tap hint if the text actually has glossary words
  const hasGlossary = paragraphs.some((para) =>
    para.some((seg) => typeof seg !== "string"),
  );
  if (hasGlossary) {
    const hint = document.createElement("p");
    hint.className = "exo-glossary__hint";
    hint.textContent = "Tippe die unterstrichenen Wörter an ↓";
    wrap.appendChild(hint);
  }

  for (const para of paragraphs) {
    const p = document.createElement("p");
    p.className = "exo-glossary__para";
    for (const seg of para) {
      if (typeof seg === "string") {
        p.appendChild(document.createTextNode(seg));
      } else {
        const btn = document.createElement("button");
        btn.className = "glossary-word";
        btn.type = "button";
        btn.textContent = seg.w;
        const pop = document.createElement("span");
        pop.className = "glossary-pop";
        pop.textContent = seg.de;
        btn.appendChild(pop);
        btn.addEventListener("click", () => {
          const open = btn.classList.contains("glossary-word--open");
          wrap.querySelectorAll(".glossary-word--open").forEach((b) =>
            b.classList.remove("glossary-word--open"),
          );
          btn.classList.toggle("glossary-word--open", !open);
        });
        p.appendChild(btn);
      }
    }
    wrap.appendChild(p);
  }
  return wrap;
}

/* ---------- Multiple choice ------------------------------------ */

/**
 * @param {{ questions: Array<{q: string, options: string[], correct: number}> }} data
 */
export function createMultipleChoice({ questions }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-mc";

  questions.forEach((question, qi) => {
    const block = document.createElement("div");
    block.className = "exo-mc__q";

    const q = document.createElement("p");
    q.className = "exo-mc__prompt";
    q.textContent = `${qi + 1}. ${question.q}`;
    block.appendChild(q);

    const opts = document.createElement("div");
    opts.className = "exo-mc__opts";
    let solved = false;

    question.options.forEach((label, oi) => {
      const btn = document.createElement("button");
      btn.className = "exo-mc__opt";
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        if (solved || btn.disabled) return;
        // We never reveal the answer — only mark the picked option
        // right or wrong. Wrong picks stay disabled so the learner
        // keeps trying until they find it themselves.
        if (oi === question.correct) {
          solved = true;
          btn.classList.add("exo-mc__opt--right");
          opts.querySelectorAll("button").forEach((b) => (b.disabled = true));
        } else {
          btn.classList.add("exo-mc__opt--wrong");
          btn.disabled = true;
        }
      });
      opts.appendChild(btn);
    });

    block.appendChild(opts);
    wrap.appendChild(block);
  });

  return wrap;
}

/* ---------- Group sort ("Раздели на группы") ------------------- */

/**
 * Click a chip to select it, then click a bin to drop it in.
 * Check validates each placement.
 *
 * @param {{ groups: Array<{label: string, items: string[]}> }} data
 */
export function createGroupSort({ groups }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-sort";

  // Flatten items with their correct group, then shuffle deterministically
  const items = [];
  groups.forEach((g, gi) => g.items.forEach((it) => items.push({ text: it, group: gi })));
  for (let i = 0; i < items.length; i++) {
    const j = (i * 7 + 3) % items.length; // stable pseudo-shuffle (no Math.random)
    [items[i], items[j]] = [items[j], items[i]];
  }

  let selected = null;

  const tray = document.createElement("div");
  tray.className = "exo-sort__tray";
  const chips = items.map((item) => {
    const chip = document.createElement("button");
    chip.className = "exo-sort__chip";
    chip.type = "button";
    chip.textContent = item.text;
    chip.dataset.group = String(item.group);
    chip.addEventListener("click", () => {
      if (chip.classList.contains("exo-sort__chip--locked")) return;
      const isSel = chip === selected;
      wrap.querySelectorAll(".exo-sort__chip--sel").forEach((c) =>
        c.classList.remove("exo-sort__chip--sel"),
      );
      selected = isSel ? null : chip;
      chip.classList.toggle("exo-sort__chip--sel", !isSel);
    });
    tray.appendChild(chip);
    return chip;
  });
  wrap.appendChild(tray);

  const bins = document.createElement("div");
  bins.className = "exo-sort__bins";
  groups.forEach((g, gi) => {
    const bin = document.createElement("div");
    bin.className = "exo-sort__bin";
    const label = document.createElement("div");
    label.className = "exo-sort__bin-label";
    label.textContent = g.label;
    const drop = document.createElement("div");
    drop.className = "exo-sort__bin-drop";
    drop.dataset.group = String(gi);
    drop.addEventListener("click", () => {
      if (!selected) return;
      drop.appendChild(selected);
      selected.classList.remove("exo-sort__chip--sel");
      selected = null;
    });
    bin.append(label, drop);
    bins.appendChild(bin);
  });
  wrap.appendChild(bins);

  const checkBtn = checkButton(wrap, () => {
    let right = 0;
    chips.forEach((chip) => {
      const placed = chip.closest(".exo-sort__bin-drop");
      chip.classList.remove("exo-sort__chip--right", "exo-sort__chip--wrong");
      if (!placed) return;
      const ok = placed.dataset.group === chip.dataset.group;
      chip.classList.add(ok ? "exo-sort__chip--right" : "exo-sort__chip--wrong");
      chip.classList.add("exo-sort__chip--locked");
      if (ok) right += 1;
    });
    checkBtn.result(`${right} / ${items.length} correct`);
  });

  return wrap;
}

/* ---------- Sentence build ("составь предложения") ------------- */

/**
 * Tap word tokens in order to build each sentence; Check compares to
 * the correct order (the order given in `tokens`).
 *
 * @param {{ sentences: Array<{ tokens: string[] }> }} data
 */
export function createSentenceBuild({ sentences }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-build";

  const rows = sentences.map((sentence) => {
    const row = document.createElement("div");
    row.className = "exo-build__row";

    const line = document.createElement("div");
    line.className = "exo-build__line";

    const bank = document.createElement("div");
    bank.className = "exo-build__bank";

    const order = [];
    // stable shuffle
    const shuffled = sentence.tokens.map((t, i) => ({ t, i }));
    for (let i = 0; i < shuffled.length; i++) {
      const j = (i * 5 + 2) % shuffled.length;
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    shuffled.forEach(({ t, i }) => {
      const tok = document.createElement("button");
      tok.className = "exo-build__tok";
      tok.type = "button";
      tok.textContent = t;
      tok.dataset.idx = String(i);
      tok.addEventListener("click", () => {
        if (tok.classList.contains("exo-build__tok--used")) {
          // send back to bank
          tok.classList.remove("exo-build__tok--used");
          bank.appendChild(tok);
          const pos = order.indexOf(tok);
          if (pos > -1) order.splice(pos, 1);
        } else {
          tok.classList.add("exo-build__tok--used");
          line.appendChild(tok);
          order.push(tok);
        }
        row.dataset.correct = "";
      });
      bank.appendChild(tok);
    });

    row.append(line, bank);
    row._check = () => {
      const seq = order.map((t) => Number(t.dataset.idx));
      const ok = seq.length === sentence.tokens.length && seq.every((v, k) => v === k);
      row.classList.toggle("exo-build__row--right", ok);
      row.classList.toggle("exo-build__row--wrong", !ok);
      return ok;
    };
    return row;
  });

  rows.forEach((r) => wrap.appendChild(r));

  const checkBtn = checkButton(wrap, () => {
    const right = rows.filter((r) => r._check()).length;
    checkBtn.result(`${right} / ${rows.length} correct`);
  });

  return wrap;
}

/* ---------- Games ---------------------------------------------- */

/**
 * Embed the bundled "Monster's Lunch" hangman, fed this page's
 * vocabulary via the ?w= URL parameter. Falls back to a placeholder
 * if no words are supplied.
 *
 * @param {{ game?: string, words?: Array<{word: string, hint: string}> }} data
 */
export function createGame(data) {
  if (data.game === "monster-hangman" && data.words?.length) {
    const wrap = document.createElement("div");
    wrap.className = "exo exo-game";
    const frame = document.createElement("iframe");
    frame.className = "exo-game__frame";
    frame.title = "Monster's Lunch — vocabulary hangman";
    frame.loading = "lazy";
    const w = encodeURIComponent(
      data.words.map((it) => `${it.word}|${it.hint ?? ""}`).join("\n"),
    );
    frame.src = `assets/games/monster-hangman/index.html?w=${w}`;
    // The game posts its real height; fit the frame to it exactly.
    window.addEventListener("message", (e) => {
      if (e.source === frame.contentWindow && e.data?.type === "gameHeight") {
        frame.style.height = `${e.data.h}px`;
      }
    });
    wrap.appendChild(frame);
    return wrap;
  }
  const wrap = document.createElement("div");
  wrap.className = "exo exo-game";
  wrap.innerHTML =
    '<div class="exo-game__slot">🎮<br>Spiel<br><span>coming soon</span></div>';
  return wrap;
}

/* ---------- shared bits ---------------------------------------- */

function checkButton(wrap, onCheck) {
  const bar = document.createElement("div");
  bar.className = "exo__checkbar";
  const btn = document.createElement("button");
  btn.className = "exo__check";
  btn.type = "button";
  btn.textContent = "Check";
  const res = document.createElement("span");
  res.className = "exo__result";
  btn.addEventListener("click", onCheck);
  bar.append(btn, res);
  wrap.appendChild(bar);
  return { el: btn, result: (text) => (res.textContent = text) };
}
