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
export function createGlossaryText({ paragraphs, highlight }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-glossary";

  // Only show the tap hint if the text actually has glossary words
  const hasGlossary = paragraphs.some((para) =>
    para.some((seg) => typeof seg !== "string"),
  );

  // ----- Optional colour highlighter (a "marker pen" per tense) -----
  // A study aid, not a checked exercise: pick a colour, then tap words to
  // mark them. Tapping again (or the eraser) removes the mark.
  const hlColors = highlight?.colors ?? [];
  const hlKeys = hlColors.map((c) => c.key);
  const hlAnswers = highlight?.answers ?? [];
  const markables = []; // every span/button that can be marked, in text order
  let activePen = null;
  const marked = new Set();
  let updateCount = () => {};

  const applyHighlight = (el) => {
    if (!activePen) return false;
    el.classList.remove("hl-correct", "hl-incorrect"); // marking again clears Check feedback
    hlKeys.forEach((k) => el.classList.remove(`hl--${k}`));
    if (activePen === "erase") {
      el.classList.remove("hl-on");
      el.dataset.hl = "";
      marked.delete(el);
    } else if (el.dataset.hl === activePen) {
      el.classList.remove("hl-on"); // tapping the same colour again clears it
      el.dataset.hl = "";
      marked.delete(el);
    } else {
      el.classList.add(`hl--${activePen}`, "hl-on");
      el.dataset.hl = activePen;
      marked.add(el);
    }
    updateCount();
    return true;
  };

  if (hlColors.length) {
    wrap.classList.add("exo-glossary--hl");
    const bar = document.createElement("div");
    bar.className = "exo-hl__bar";
    if (highlight.hint) {
      const lab = document.createElement("span");
      lab.className = "exo-hl__label";
      lab.textContent = highlight.hint;
      bar.appendChild(lab);
    }
    const pens = [];
    const setPen = (key, btn) => {
      const on = activePen === key;
      activePen = on ? null : key;
      pens.forEach((b) => b.classList.toggle("exo-hl__pen--active", b === btn && !on));
      wrap.classList.toggle("exo-glossary--penning", activePen !== null);
    };
    [...hlColors, { key: "erase", label: "Radiergummi" }].forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `exo-hl__pen exo-hl__pen--${c.key}`;
      const dot = document.createElement("span");
      dot.className = "exo-hl__dot";
      btn.append(dot, document.createTextNode(c.label));
      btn.addEventListener("click", () => setPen(c.key, btn));
      bar.appendChild(btn);
      pens.push(btn);
    });
    wrap.appendChild(bar);
  } else if (hasGlossary) {
    const hint = document.createElement("p");
    hint.className = "exo-glossary__hint";
    hint.textContent = "Tippe die unterstrichenen Wörter an ↓";
    wrap.appendChild(hint);
  }

  // Split a plain string into word tokens (highlightable) and the
  // whitespace/punctuation between them (plain text).
  const tokenize = (str) => {
    const out = [];
    const re = /[A-Za-zÀ-ſ][A-Za-zÀ-ſ'’-]*/g;
    let last = 0, m;
    while ((m = re.exec(str))) {
      if (m.index > last) out.push({ word: false, text: str.slice(last, m.index) });
      out.push({ word: true, text: m[0] });
      last = m.index + m[0].length;
    }
    if (last < str.length) out.push({ word: false, text: str.slice(last) });
    return out;
  };

  const makeWord = (text) => {
    const s = document.createElement("span");
    s.className = "hl-word";
    s.textContent = text;
    s.addEventListener("click", () => applyHighlight(s));
    markables.push(s);
    return s;
  };

  for (const para of paragraphs) {
    const p = document.createElement("p");
    p.className = "exo-glossary__para";
    for (const seg of para) {
      if (typeof seg === "string") {
        if (hlColors.length) {
          tokenize(seg).forEach((tok) =>
            p.appendChild(tok.word ? makeWord(tok.text) : document.createTextNode(tok.text)),
          );
        } else {
          p.appendChild(document.createTextNode(seg));
        }
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
          // With a pen selected, the word gets highlighted; otherwise the
          // glossary word still reveals its German translation.
          if (applyHighlight(btn)) return;
          const open = btn.classList.contains("glossary-word--open");
          wrap.querySelectorAll(".glossary-word--open").forEach((b) =>
            b.classList.remove("glossary-word--open"),
          );
          btn.classList.toggle("glossary-word--open", !open);
        });
        if (hlColors.length) markables.push(btn);
        p.appendChild(btn);
      }
    }
    wrap.appendChild(p);
  }

  // Assign each verb form its expected tense (in text order) so the marks
  // can be checked. Non-verb words get no expected tense.
  if (hlAnswers.length) {
    const norm2 = (t) => (t ?? "").toLowerCase().replace(/[’‘`]/g, "'").trim();
    let cur = 0;
    for (const ans of hlAnswers) {
      const target = norm2(ans.word);
      while (cur < markables.length && norm2(markables[cur].textContent) !== target) cur++;
      if (cur < markables.length) {
        markables[cur].dataset.expected = ans.tense;
        cur++;
      }
    }
  }

  // Footer: optional Check + clear-all + a running count / result.
  if (hlColors.length) {
    const footer = document.createElement("div");
    footer.className = "exo-hl__footer";

    const count = document.createElement("span");
    count.className = "exo-hl__count";
    let checked = false;
    updateCount = () => {
      checked = false;
      status.textContent = "";
      const n = marked.size;
      count.textContent = n === 0 ? "Nothing marked yet" : `${n} word${n === 1 ? "" : "s"} marked`;
    };

    const status = document.createElement("span");
    status.className = "exo-hl__status";

    if (hlAnswers.length) {
      const check = document.createElement("button");
      check.type = "button";
      check.className = "exo-hl__check";
      check.textContent = "Check";
      check.addEventListener("click", () => {
        let right = 0, wrong = 0;
        markables.forEach((el) => {
          el.classList.remove("hl-correct", "hl-incorrect");
          if (!el.dataset.hl) return;
          if (el.dataset.expected && el.dataset.hl === el.dataset.expected) {
            el.classList.add("hl-correct");
            right += 1;
          } else {
            el.classList.add("hl-incorrect");
            wrong += 1;
          }
        });
        checked = true;
        count.textContent = "";
        if (wrong === 0 && right === hlAnswers.length) {
          status.textContent = "Perfect — all verb forms found! ✓";
          status.dataset.tone = "ok";
        } else {
          status.textContent = `${right} / ${hlAnswers.length} verb forms correct${wrong ? ` · ${wrong} to fix` : ""}`;
          status.dataset.tone = wrong ? "warn" : "ok";
        }
      });
      footer.appendChild(check);
    }

    const clear = document.createElement("button");
    clear.type = "button";
    clear.className = "exo-hl__clear";
    clear.textContent = "Clear all";
    clear.addEventListener("click", () => {
      marked.forEach((el) => {
        hlKeys.forEach((k) => el.classList.remove(`hl--${k}`));
        el.classList.remove("hl-on", "hl-correct", "hl-incorrect");
        el.dataset.hl = "";
      });
      marked.clear();
      updateCount();
    });

    updateCount();
    footer.append(clear, count, status);
    wrap.appendChild(footer);
  }

  return wrap;
}

/* ---------- Multiple choice ------------------------------------ */

/**
 * @param {{ questions: Array<{q: string, options: string[], correct: number}> }} data
 */
export function createMultipleChoice({ questions, columns }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-mc";
  if (columns === 2) wrap.classList.add("exo-mc--cols");

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

    // Shuffle the options (deterministic per question) so the correct
    // answer isn't always in the same position. The answer is still never
    // revealed — only the picked option is marked right or wrong.
    const order = question.options.map((label, i) => ({ label, correct: i === question.correct }));
    let seed = (qi + 1) * 2654435761 + 40503; // deterministic PRNG, varies per question
    const rand = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    order.forEach(({ label, correct }) => {
      const btn = document.createElement("button");
      btn.className = "exo-mc__opt";
      btn.type = "button";
      btn.textContent = label;
      btn.addEventListener("click", () => {
        if (solved || btn.disabled) return;
        // We never reveal the answer — only mark the picked option
        // right or wrong. Wrong picks stay disabled so the learner
        // keeps trying until they find it themselves.
        if (correct) {
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

  // Flatten items with their correct group, then shuffle deterministically.
  // An item is a plain string, or `{ image, label? }` for a picture chip.
  const items = [];
  groups.forEach((g, gi) => g.items.forEach((it) => items.push({ item: it, group: gi })));
  for (let i = 0; i < items.length; i++) {
    const j = (i * 7 + 3) % items.length; // stable pseudo-shuffle (no Math.random)
    [items[i], items[j]] = [items[j], items[i]];
  }

  const hasImages = items.some((e) => typeof e.item === "object" && e.item.image);

  let selected = null;

  const tray = document.createElement("div");
  tray.className = "exo-sort__tray";
  if (hasImages) tray.classList.add("exo-sort__tray--img");
  const chips = items.map((entry) => {
    const chip = document.createElement("button");
    chip.className = "exo-sort__chip";
    chip.type = "button";
    const it = entry.item;
    if (typeof it === "object" && it.image) {
      chip.classList.add("exo-sort__chip--img");
      const img = document.createElement("img");
      img.className = "exo-sort__chip-img";
      img.src = it.image;
      img.alt = it.label ?? "";
      img.loading = "lazy";
      chip.appendChild(img);
      if (it.label) {
        const cap = document.createElement("span");
        cap.className = "exo-sort__chip-cap";
        cap.textContent = it.label;
        chip.appendChild(cap);
      }
    } else {
      chip.textContent = typeof it === "string" ? it : it.text;
    }
    chip.dataset.group = String(entry.group);
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

/* ---------- Audio player (listening) --------------------------- */

/**
 * Compact journal-styled audio player: round play/pause, seekable
 * progress bar and a running time. Wraps a native <audio> element.
 *
 * @param {{ src: string, label?: string }} data
 */
export function createAudioPlayer({ src, label }) {
  const wrap = document.createElement("div");
  wrap.className = "exo-audio";

  const audio = document.createElement("audio");
  audio.src = src;
  audio.preload = "metadata";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "exo-audio__btn";
  btn.setAttribute("aria-label", "Play");
  btn.textContent = "▶";

  const body = document.createElement("div");
  body.className = "exo-audio__body";

  const cap = document.createElement("div");
  cap.className = "exo-audio__label";
  cap.textContent = label ?? "Listen";

  const bar = document.createElement("div");
  bar.className = "exo-audio__bar";
  const fill = document.createElement("div");
  fill.className = "exo-audio__fill";
  bar.appendChild(fill);

  const time = document.createElement("div");
  time.className = "exo-audio__time";
  time.textContent = "0:00 / 0:00";

  body.append(cap, bar, time);
  wrap.append(btn, body, audio);

  const fmt = (s) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = String(Math.floor(s % 60)).padStart(2, "0");
    return `${m}:${ss}`;
  };
  const paint = () => {
    fill.style.width = audio.duration ? `${(audio.currentTime / audio.duration) * 100}%` : "0%";
    time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
  };

  btn.addEventListener("click", () => {
    if (audio.paused) audio.play();
    else audio.pause();
  });
  audio.addEventListener("play", () => {
    btn.textContent = "❚❚";
    btn.setAttribute("aria-label", "Pause");
    wrap.classList.add("exo-audio--playing");
  });
  audio.addEventListener("pause", () => {
    btn.textContent = "▶";
    btn.setAttribute("aria-label", "Play");
    wrap.classList.remove("exo-audio--playing");
  });
  audio.addEventListener("timeupdate", paint);
  audio.addEventListener("loadedmetadata", paint);
  audio.addEventListener("ended", () => {
    btn.textContent = "▶";
    wrap.classList.remove("exo-audio--playing");
  });
  bar.addEventListener("click", (e) => {
    if (!audio.duration) return;
    const rect = bar.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    paint();
  });

  return wrap;
}

/* ---------- Image ↔ word match (vocabulary) -------------------- */

/**
 * Tap a picture, then tap the word that matches it. Correct pairs lock
 * green with the word overlaid; a wrong pick flashes and clears. No
 * answer is revealed — the learner keeps trying.
 *
 * @param {{ pairs: Array<{ word: string, image: string }> }} data
 */
export function createImageMatch({ pairs }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-imatch";

  const grid = document.createElement("div");
  grid.className = "exo-imatch__grid";

  let selected = null; // the chosen tile element
  const solvedWords = new Set();

  const tiles = pairs.map((p) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "exo-imatch__tile";
    tile.dataset.word = p.word;
    const img = document.createElement("img");
    img.className = "exo-imatch__img";
    img.src = p.image;
    img.alt = "";
    img.draggable = false;
    const badge = document.createElement("span");
    badge.className = "exo-imatch__badge";
    badge.textContent = p.word;
    tile.append(img, badge);
    tile.addEventListener("click", () => {
      if (tile.classList.contains("exo-imatch__tile--done")) return;
      grid.querySelectorAll(".exo-imatch__tile--sel").forEach((t) =>
        t.classList.remove("exo-imatch__tile--sel"),
      );
      selected = selected === tile ? null : tile;
      if (selected) tile.classList.add("exo-imatch__tile--sel");
    });
    grid.appendChild(tile);
    return tile;
  });

  const tray = document.createElement("div");
  tray.className = "exo-imatch__tray";
  // Stable shuffle of the words so they don't sit under their picture
  const words = pairs.map((p) => p.word);
  for (let i = 0; i < words.length; i++) {
    const j = (i * 7 + 3) % words.length;
    [words[i], words[j]] = [words[j], words[i]];
  }
  words.forEach((word) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "exo-imatch__word";
    chip.textContent = word;
    chip.addEventListener("click", () => {
      if (!selected || chip.disabled) return;
      if (selected.dataset.word === word) {
        selected.classList.remove("exo-imatch__tile--sel");
        selected.classList.add("exo-imatch__tile--done");
        chip.disabled = true;
        solvedWords.add(word);
        selected = null;
      } else {
        const bad = selected;
        bad.classList.add("exo-imatch__tile--wrong");
        setTimeout(() => bad.classList.remove("exo-imatch__tile--wrong"), 550);
        bad.classList.remove("exo-imatch__tile--sel");
        selected = null;
      }
    });
    tray.appendChild(chip);
  });

  wrap.append(grid, tray);
  return wrap;
}

/* ---------- Event order (sequence 1..N) ------------------------ */

/**
 * Number the events 1..N in the correct order, then Check. Right rows
 * lock green; wrong rows go red but keep their number for another try.
 *
 * @param {{ events: Array<{ text: string }> }} data  (events are given IN correct order)
 */
export function createEventOrder({ events }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-order";

  const n = events.length;
  // Present the events in a stable shuffled order (not the answer order)
  const shown = events.map((e, i) => ({ text: e.text, correct: i + 1 }));
  for (let i = 0; i < shown.length; i++) {
    const j = (i * 3 + 2) % shown.length;
    [shown[i], shown[j]] = [shown[j], shown[i]];
  }

  const rows = shown.map((e) => {
    const row = document.createElement("div");
    row.className = "exo-order__row";
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = String(n);
    input.className = "exo-order__num";
    input.addEventListener("input", () =>
      row.classList.remove("exo-order__row--right", "exo-order__row--wrong"),
    );
    const text = document.createElement("span");
    text.className = "exo-order__text";
    text.textContent = e.text;
    row.append(input, text);
    wrap.appendChild(row);
    return { row, input, correct: e.correct };
  });

  const checkBtn = checkButton(wrap, () => {
    let right = 0;
    for (const r of rows) {
      const val = parseInt(r.input.value, 10);
      const ok = val === r.correct;
      r.row.classList.toggle("exo-order__row--right", ok);
      r.row.classList.toggle("exo-order__row--wrong", !ok && !!r.input.value);
      if (ok) right += 1;
    }
    checkBtn.result(`${right} / ${n} in order`);
  });

  return wrap;
}

/* ---------- Inline choice (pronoun select / dialogue fill) ----- */

/**
 * A passage with inline gaps; each gap offers a few options and the
 * learner picks one per gap, then Checks. ≤3 options render as buttons,
 * more as a dropdown. Right locks green, wrong goes red (no reveal).
 * `segments`: string (literal) or { gap: index }. `gaps`: [{options, answer}].
 *
 * @param {{ layout?: "prose"|"dialogue", bank?: string[], segments: Array, gaps: Array<{options:string[], answer:string}>, lines?: Array<{speaker?:string, segments:Array}> }} data
 */
export function createInlineChoice(data) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-inline";

  if (data.bank?.length) {
    const bank = document.createElement("div");
    bank.className = "exo-inline__bank";
    const cap = document.createElement("span");
    cap.className = "exo-inline__bank-cap";
    cap.textContent = "Useful language";
    bank.appendChild(cap);
    data.bank.forEach((p) => {
      const pill = document.createElement("span");
      pill.className = "exo-inline__bank-pill";
      pill.textContent = p;
      bank.appendChild(pill);
    });
    wrap.appendChild(bank);
  }

  const controls = [];

  const renderGap = (gapIndex) => {
    const gap = data.gaps[gapIndex];
    const holder = document.createElement("span");
    holder.className = "exo-inline__gap";
    const sup = document.createElement("sup");
    sup.className = "exo-inline__sup";
    sup.textContent = gapIndex + 1;
    holder.appendChild(sup);

    let getValue;
    if (gap.options.length <= 3) {
      const btns = gap.options.map((opt) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "exo-inline__opt";
        b.textContent = opt;
        b.addEventListener("click", () => {
          if (holder.dataset.locked) return;
          holder.querySelectorAll(".exo-inline__opt").forEach((x) =>
            x.classList.remove("exo-inline__opt--sel"),
          );
          b.classList.add("exo-inline__opt--sel");
          holder.dataset.value = opt;
        });
        holder.appendChild(b);
        return b;
      });
      getValue = () => holder.dataset.value ?? "";
      controls.push({ holder, getValue, answer: gap.answer, btns });
    } else {
      const sel = document.createElement("select");
      sel.className = "exo-inline__select";
      const blank = document.createElement("option");
      blank.value = "";
      blank.textContent = "—";
      sel.appendChild(blank);
      gap.options.forEach((opt) => {
        const o = document.createElement("option");
        o.value = opt;
        o.textContent = opt;
        sel.appendChild(o);
      });
      holder.appendChild(sel);
      getValue = () => sel.value;
      controls.push({ holder, getValue, answer: gap.answer, select: sel });
    }
    return holder;
  };

  const renderSegments = (segments, parent) => {
    for (const seg of segments) {
      if (typeof seg === "string") {
        const s = document.createElement("span");
        s.textContent = seg;
        parent.appendChild(s);
      } else {
        parent.appendChild(renderGap(seg.gap));
      }
    }
  };

  if (data.layout === "dialogue" && data.lines) {
    const table = document.createElement("div");
    table.className = "exo-inline__dialogue";
    data.lines.forEach((line) => {
      const row = document.createElement("div");
      row.className = "exo-inline__dline";
      const who = document.createElement("span");
      who.className = "exo-inline__speaker";
      who.textContent = line.speaker ?? "";
      const said = document.createElement("span");
      said.className = "exo-inline__said";
      renderSegments(line.segments, said);
      row.append(who, said);
      table.appendChild(row);
    });
    wrap.appendChild(table);
  } else {
    const para = document.createElement("p");
    para.className = "exo-inline__para";
    renderSegments(data.segments ?? [], para);
    wrap.appendChild(para);
  }

  const checkBtn = checkButton(wrap, () => {
    let right = 0;
    for (const c of controls) {
      const ok = norm(c.getValue()) === norm(c.answer);
      c.holder.classList.toggle("exo-inline__gap--right", ok);
      c.holder.classList.toggle("exo-inline__gap--wrong", !ok && !!c.getValue());
      if (ok) {
        c.holder.dataset.locked = "1";
        if (c.select) c.select.disabled = true;
        c.btns?.forEach((b) => (b.disabled = true));
        right += 1;
      }
      // mark which button the learner picked, when wrong
      if (!ok && c.btns) {
        c.btns.forEach((b) =>
          b.classList.toggle(
            "exo-inline__opt--miss",
            b.classList.contains("exo-inline__opt--sel"),
          ),
        );
      }
    }
    checkBtn.result(`${right} / ${controls.length} correct`);
  });

  return wrap;
}

/* ---------- Caption builder (Sell It! challenge) --------------- */

const CAPTION_CHECKS = [
  { key: "hook", label: "Catchy opening line", test: (c) => c.trim().split(/[.!?\n]/)[0].trim().length > 5 },
  { key: "indef", label: "Indefinite pronoun (everyone, nothing…)", test: (c) => /\b(everyone|everybody|someone|somebody|anyone|anybody|no one|nobody|everything|something|anything|nothing)\b/i.test(c) },
  { key: "reflex", label: "Reflexive / reciprocal pronoun (yourself, each other…)", test: (c) => /\b(myself|yourself|himself|herself|itself|ourselves|yourselves|themselves|each other|one another)\b/i.test(c) },
  { key: "fomo", label: "FOMO language (don't miss, limited, only…)", test: (c) => /missing out|don't miss|do not miss|limited|only|now|today|last chance|hurry|everyone is talking/i.test(c) },
  { key: "tags", label: "3–5 hashtags", test: (c) => { const n = (c.match(/#\w+/g) || []).length; return n >= 3 && n <= 5; } },
];

/**
 * "Sell It!" — write a persuasive Instagram caption; a live checklist
 * ticks each of the five requirements automatically as you type. Product
 * and caption persist and go to the PDF.
 *
 * @param {{ values: {product:string, caption:string}, keyFor:(f:string)=>string, onChange:(f:string,v:string)=>void }} opts
 */
export function createCaptionBuilder({ values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-caption";

  const grid = document.createElement("div");
  grid.className = "exo-caption__grid";

  const form = document.createElement("div");
  form.className = "exo-caption__form";

  const mkField = (key, labelText, el) => {
    const label = document.createElement("label");
    label.className = "exo-caption__field";
    const cap = document.createElement("span");
    cap.className = "exo-caption__label";
    cap.textContent = labelText;
    el.className = "exo-caption__input";
    el.value = values?.[key] ?? "";
    el.dataset.answerKey = keyFor(key);
    el.addEventListener("input", () => {
      onChange(key, el.value);
      update();
    });
    label.append(cap, el);
    return label;
  };

  const productInput = document.createElement("input");
  productInput.type = "text";
  productInput.placeholder = "e.g. wireless headphones, skincare, an energy drink…";
  const captionArea = document.createElement("textarea");
  captionArea.rows = 8;
  captionArea.placeholder = "✨ Stop what you're doing — everyone needs to try this!\n\n#YourHashtags #Here";

  form.append(
    mkField("product", "Your product", productInput),
    mkField("caption", "Your Instagram caption", captionArea),
  );

  const panel = document.createElement("div");
  panel.className = "exo-caption__panel";
  const head = document.createElement("div");
  head.className = "exo-caption__panel-head";
  const title = document.createElement("span");
  title.textContent = "Requirements";
  const count = document.createElement("span");
  count.className = "exo-caption__count";
  head.append(title, count);
  panel.appendChild(head);

  const rows = CAPTION_CHECKS.map((c) => {
    const row = document.createElement("div");
    row.className = "exo-caption__req";
    const dot = document.createElement("span");
    dot.className = "exo-caption__dot";
    const text = document.createElement("span");
    text.className = "exo-caption__req-label";
    text.textContent = c.label;
    row.append(dot, text);
    panel.appendChild(row);
    return { row, def: c };
  });

  const done = document.createElement("div");
  done.className = "exo-caption__done";
  done.textContent = "All five requirements met! 🎉";
  panel.appendChild(done);

  grid.append(form, panel);
  wrap.appendChild(grid);

  function update() {
    const c = captionArea.value;
    let n = 0;
    for (const r of rows) {
      const ok = r.def.test(c);
      r.row.classList.toggle("exo-caption__req--ok", ok);
      if (ok) n += 1;
    }
    count.textContent = `${n}/5`;
    wrap.classList.toggle("exo-caption--complete", n === 5);
  }

  update();
  return wrap;
}

/* ---------- Phrase reference (writing) ------------------------- */

/**
 * A colour-coded reference panel of English ↔ German phrase pairs,
 * grouped into sections (Introduction, Arguments For, …).
 *
 * @param {{ sections: Array<{ label: string, accent: string, pairs: Array<[string,string]> }> }} data
 */
export function createPhraseReference({ sections }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-phrases";
  for (const sec of sections) {
    const block = document.createElement("div");
    block.className = `exo-phrases__sec exo-phrases__sec--${sec.accent}`;
    const label = document.createElement("div");
    label.className = "exo-phrases__label";
    label.textContent = sec.label;
    block.appendChild(label);
    const grid = document.createElement("div");
    grid.className = "exo-phrases__grid";
    for (const [en, de] of sec.pairs) {
      const enEl = document.createElement("span");
      enEl.className = "exo-phrases__en";
      enEl.textContent = en;
      const deEl = document.createElement("span");
      deEl.className = "exo-phrases__de";
      deEl.textContent = de;
      grid.append(enEl, deEl);
    }
    block.appendChild(grid);
    wrap.appendChild(block);
  }
  return wrap;
}

/* ---------- Match up (dropdown matching) ----------------------- */

/**
 * Match each left item to the right option via a dropdown, then Check.
 * Right locks green, wrong goes red (no reveal).
 *
 * @param {{ options: string[], items: Array<{ left: string, answer: string }> }} data
 */
export function createMatchUp({ options, items }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-match";

  const rows = items.map((item) => {
    const row = document.createElement("div");
    row.className = "exo-match__row";
    const left = document.createElement("span");
    left.className = "exo-match__left";
    left.textContent = item.left;
    const sel = document.createElement("select");
    sel.className = "exo-match__select";
    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = "—";
    sel.appendChild(blank);
    for (const opt of options) {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      sel.appendChild(o);
    }
    sel.addEventListener("change", () =>
      row.classList.remove("exo-match__row--right", "exo-match__row--wrong"),
    );
    row.append(left, sel);
    wrap.appendChild(row);
    return { row, sel, answer: item.answer };
  });

  const checkBtn = checkButton(wrap, () => {
    let right = 0;
    for (const r of rows) {
      if (r.row.classList.contains("exo-match__row--right")) {
        right += 1;
        continue;
      }
      const ok = norm(r.sel.value) === norm(r.answer);
      r.row.classList.toggle("exo-match__row--right", ok);
      r.row.classList.toggle("exo-match__row--wrong", !ok && !!r.sel.value);
      if (ok) {
        r.sel.disabled = true;
        right += 1;
      }
    }
    checkBtn.result(`${right} / ${rows.length} correct`);
  });

  return wrap;
}

/* ---------- Argument pick (spot the suitable ones) ------------- */

/* ---------- Tap-match (two-column instant matcher) ------------- */

/**
 * Two columns of chips: tap a left item, then tap its partner on the
 * right. A correct pair locks in green immediately; a wrong pair shakes
 * red and clears. A running counter + Reset; a "well done" line at the
 * end. The right column is shuffled deterministically.
 *
 * @param {{ pairs: Array<{left: string, right: string}>, leftLabel?: string, rightLabel?: string }} data
 */
export function createTapMatch({ pairs, leftLabel = "English", rightLabel = "Deutsch" }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-tap";

  const head = document.createElement("div");
  head.className = "exo-tap__head";
  const hl = document.createElement("span");
  hl.className = "exo-tap__collabel";
  hl.textContent = leftLabel;
  const hr = document.createElement("span");
  hr.className = "exo-tap__collabel";
  hr.textContent = rightLabel;
  head.append(hl, hr);
  wrap.appendChild(head);

  const grid = document.createElement("div");
  grid.className = "exo-tap__grid";
  const leftCol = document.createElement("div");
  leftCol.className = "exo-tap__col";
  const rightCol = document.createElement("div");
  rightCol.className = "exo-tap__col";
  grid.append(leftCol, rightCol);
  wrap.appendChild(grid);

  // Deterministic shuffle of the right column (no Math.random).
  const order = pairs.map((_, i) => i);
  for (let i = 0; i < order.length; i++) {
    const j = (i * 3 + 2) % order.length;
    [order[i], order[j]] = [order[j], order[i]];
  }

  const leftBtns = new Map();
  const rightBtns = new Map();
  const matched = new Set();
  let selLeft = null;

  const footer = document.createElement("div");
  footer.className = "exo-tap__footer";
  const countPill = document.createElement("span");
  countPill.className = "exo-tap__count";
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "exo-tap__reset";
  reset.textContent = "Reset";
  const done = document.createElement("span");
  done.className = "exo-tap__done";
  done.textContent = "✓ Well done — all matched!";
  footer.append(countPill, reset, done);

  const paint = () => {
    countPill.textContent = `${matched.size} / ${pairs.length}`;
    wrap.classList.toggle("exo-tap--done", matched.size === pairs.length);
  };

  const clearSel = () => {
    if (selLeft != null) leftBtns.get(selLeft).classList.remove("exo-tap__item--sel");
    selLeft = null;
  };

  pairs.forEach((p, id) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "exo-tap__item";
    b.textContent = p.left;
    b.addEventListener("click", () => {
      if (matched.has(id)) return;
      const wasSel = selLeft === id;
      clearSel();
      if (!wasSel) {
        selLeft = id;
        b.classList.add("exo-tap__item--sel");
      }
    });
    leftBtns.set(id, b);
    leftCol.appendChild(b);
  });

  order.forEach((id) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "exo-tap__item";
    b.textContent = pairs[id].right;
    b.addEventListener("click", () => {
      if (matched.has(id) || selLeft == null) return;
      if (selLeft === id) {
        matched.add(id);
        leftBtns.get(id).classList.remove("exo-tap__item--sel");
        leftBtns.get(id).classList.add("exo-tap__item--done");
        b.classList.add("exo-tap__item--done");
        selLeft = null;
        paint();
      } else {
        const lb = leftBtns.get(selLeft);
        lb.classList.add("exo-tap__item--wrong");
        b.classList.add("exo-tap__item--wrong");
        selLeft = null;
        setTimeout(() => {
          lb.classList.remove("exo-tap__item--wrong", "exo-tap__item--sel");
          b.classList.remove("exo-tap__item--wrong");
        }, 450);
      }
    });
    rightBtns.set(id, b);
    rightCol.appendChild(b);
  });

  reset.addEventListener("click", () => {
    matched.clear();
    selLeft = null;
    leftBtns.forEach((b) => b.classList.remove("exo-tap__item--sel", "exo-tap__item--done", "exo-tap__item--wrong"));
    rightBtns.forEach((b) => b.classList.remove("exo-tap__item--done", "exo-tap__item--wrong"));
    paint();
  });

  wrap.appendChild(footer);
  paint();
  return wrap;
}

/**
 * Tick the suitable arguments and ignore the absurd ones, then Check.
 * Each argument shows a German hint (suitable) or a "think about it"
 * nudge (absurd) before checking, and clear feedback after.
 *
 * @param {{ args: Array<{ text: string, hint: string, correct: boolean }> }} data
 */
export function createArgumentPick({ args }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-args";

  const suitable = args.filter((a) => a.correct).length;
  const lead = document.createElement("p");
  lead.className = "exo-args__lead";
  lead.textContent = `Tick the ${suitable} suitable arguments — ignore the absurd ones.`;
  wrap.appendChild(lead);

  const rows = args.map((arg) => {
    const label = document.createElement("label");
    label.className = "exo-args__row";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.className = "exo-args__box";
    const body = document.createElement("div");
    body.className = "exo-args__body";
    const text = document.createElement("p");
    text.className = "exo-args__text";
    text.textContent = arg.text;
    // No hint before checking — just the argument text.
    const note = document.createElement("p");
    note.className = "exo-args__note";
    body.append(text, note);
    label.append(box, body);
    wrap.appendChild(label);
    return { label, box, note, arg };
  });

  const checkBtn = checkButton(wrap, () => {
    let right = 0;
    for (const r of rows) {
      const ticked = r.box.checked;
      r.box.disabled = true;
      r.label.classList.remove("exo-args__row--good", "exo-args__row--miss", "exo-args__row--bad");
      if (r.arg.correct && ticked) {
        r.label.classList.add("exo-args__row--good");
        r.note.textContent = "A suitable argument.";
        right += 1;
      } else if (r.arg.correct && !ticked) {
        r.label.classList.add("exo-args__row--miss");
        r.note.textContent = "You missed this suitable argument.";
      } else if (!r.arg.correct && ticked) {
        r.label.classList.add("exo-args__row--bad");
        r.note.textContent = "Not a suitable argument.";
      } else {
        r.note.textContent = "Correctly ignored.";
        right += 1;
      }
    }
    checkBtn.result(`${right} / ${rows.length} correct`);
  });

  return wrap;
}

/* ---------- Paragraph builder (guided writing) ----------------- */

/**
 * Guided paragraph: a coloured header (title + goal) and one row per
 * sentence — a fixed starter, an input (persisted), a German hint, and a
 * collapsible model example. Feeds the PDF.
 *
 * @param {{
 *   paragraph: { title: string, goal: string, sentences: Array<{label:string, starter:string, placeholder?:string, hint?:string, example?:string}> },
 *   values: Record<string,string>, keyFor: (i:number)=>string, onChange: (i:number, v:string)=>void,
 * }} opts
 */
export function createParagraphBuilder({ paragraph, values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-para";

  const goal = document.createElement("p");
  goal.className = "exo-para__goal";
  goal.textContent = `Goal: ${paragraph.goal}`;
  wrap.appendChild(goal);

  paragraph.sentences.forEach((s, i) => {
    const row = document.createElement("div");
    row.className = "exo-para__row";

    const head = document.createElement("div");
    head.className = "exo-para__head";
    const label = document.createElement("span");
    label.className = "exo-para__label";
    label.textContent = s.label;
    head.appendChild(label);

    let exBox = null;
    if (s.example) {
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "exo-para__toggle";
      toggle.textContent = "Show example";
      exBox = document.createElement("div");
      exBox.className = "exo-para__example";
      exBox.textContent = s.example;
      exBox.hidden = true;
      toggle.addEventListener("click", () => {
        exBox.hidden = !exBox.hidden;
        toggle.textContent = exBox.hidden ? "Show example" : "Hide example";
      });
      head.appendChild(toggle);
    }
    row.appendChild(head);
    if (exBox) row.appendChild(exBox);

    const line = document.createElement("div");
    line.className = "exo-para__line";
    const starter = document.createElement("span");
    starter.className = "exo-para__starter";
    starter.textContent = s.starter;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "exo-para__input";
    input.placeholder = s.placeholder ?? "";
    input.dataset.answerKey = keyFor(i);
    input.value = values?.[keyFor(i)] ?? "";
    input.addEventListener("input", () => onChange(i, input.value));
    line.append(starter, input);
    row.appendChild(line);

    if (s.hint) {
      const hint = document.createElement("p");
      hint.className = "exo-para__hint";
      hint.textContent = `🇩🇪 ${s.hint}`;
      row.appendChild(hint);
    }
    wrap.appendChild(row);
  });

  return wrap;
}

/* ---------- Essay editor (final written discussion) ------------ */

/**
 * A big writing area with a live word count and a target bar, plus an
 * optional self-check list. Persists to the PDF.
 *
 * @param {{
 *   min?: number, max?: number, placeholder?: string, checklist?: string[],
 *   value: string, answerKey: string, onChange: (v:string)=>void,
 * }} opts
 */
export function createEssayEditor({ min = 120, max = 150, placeholder, checklist, chips, subject, value, answerKey, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-essay";

  // Optional requirement chips (numbered "must include" points).
  if (chips?.length) {
    const chipRow = document.createElement("div");
    chipRow.className = "exo-essay__chips";
    chips.forEach((chip, i) => {
      const c = document.createElement("span");
      c.className = "exo-essay__chip";
      const n = typeof chip === "string" ? String(i + 1).padStart(2, "0") : chip.n;
      const label = typeof chip === "string" ? chip : chip.label;
      c.innerHTML = `<span class="exo-essay__chip-n">${n}</span>${label}`;
      chipRow.appendChild(c);
    });
    wrap.appendChild(chipRow);
  }

  const area = document.createElement("textarea");
  area.className = "exo-essay__area";
  area.rows = 12;
  area.placeholder = placeholder ?? `Write your written discussion here (${min}–${max} words)…`;
  area.dataset.answerKey = answerKey;
  area.value = value ?? "";

  // Optional mail-window chrome: traffic lights + a fixed subject line
  // above the textarea (turns the essay box into a compose window).
  if (subject) {
    const mail = document.createElement("div");
    mail.className = "exo-essay__mail";
    const bar = document.createElement("div");
    bar.className = "exo-essay__mail-bar";
    bar.innerHTML =
      '<span class="exo-essay__dot"></span><span class="exo-essay__dot"></span>' +
      '<span class="exo-essay__dot"></span><span class="exo-essay__mail-cap">Compose your reply</span>';
    const subj = document.createElement("div");
    subj.className = "exo-essay__subject";
    subj.innerHTML = `<span>Subject:</span> ${subject}`;
    area.classList.add("exo-essay__area--mail");
    mail.append(bar, subj, area);
    wrap.appendChild(mail);
  }

  const meter = document.createElement("div");
  meter.className = "exo-essay__meter";
  const label = document.createElement("div");
  label.className = "exo-essay__meter-label";
  const count = document.createElement("span");
  count.className = "exo-essay__count";
  const msg = document.createElement("span");
  msg.className = "exo-essay__msg";
  label.append(count, msg);
  const track = document.createElement("div");
  track.className = "exo-essay__track";
  const zone = document.createElement("div");
  zone.className = "exo-essay__zone";
  zone.style.left = `${Math.min((min / max) * 100, 100)}%`;
  zone.style.right = "0";
  const fill = document.createElement("div");
  fill.className = "exo-essay__fill";
  track.append(zone, fill);
  const target = document.createElement("p");
  target.className = "exo-essay__target";
  target.textContent = `Target: ${min}–${max} words`;
  meter.append(label, track, target);

  const paint = () => {
    const words = area.value.trim() ? area.value.trim().split(/\s+/).filter(Boolean).length : 0;
    count.textContent = `${words} words`;
    fill.style.width = `${Math.min((words / max) * 100, 100)}%`;
    let level = "low", m = "Keep going…";
    if (words > max) { level = "over"; m = "Over the limit — trim a little."; }
    else if (words >= min) { level = "ok"; m = "Target reached!"; }
    else if (words >= min - 40) { level = "near"; m = "Almost there!"; }
    fill.dataset.level = level;
    count.dataset.level = level;
    msg.textContent = m;
  };

  area.addEventListener("input", () => {
    onChange(area.value);
    paint();
  });

  if (!subject) wrap.appendChild(area);
  wrap.appendChild(meter);

  if (checklist?.length) {
    wrap.appendChild(createChecklist({ items: checklist, title: "Self-check" }));
  }

  paint();
  return wrap;
}

/* ---------- Checklist (tick + count) --------------------------- */

/**
 * @param {{ items: string[], title?: string }} data
 */
export function createChecklist({ items, title }) {
  const wrap = document.createElement("div");
  wrap.className = "exo-check";
  const head = document.createElement("div");
  head.className = "exo-check__head";
  const cap = document.createElement("span");
  cap.textContent = title ?? "Checklist";
  const count = document.createElement("span");
  count.className = "exo-check__count";
  head.append(cap, count);
  wrap.appendChild(head);

  let done = 0;
  const boxes = [];
  items.forEach((item) => {
    const label = document.createElement("label");
    label.className = "exo-check__row";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.className = "exo-check__box";
    const text = document.createElement("span");
    text.className = "exo-check__text";
    text.textContent = item;
    box.addEventListener("change", () => {
      done += box.checked ? 1 : -1;
      count.textContent = `${done}/${items.length}`;
      wrap.classList.toggle("exo-check--done", done === items.length);
      label.classList.toggle("exo-check__row--on", box.checked);
    });
    label.append(box, text);
    wrap.appendChild(label);
    boxes.push(box);
  });
  count.textContent = `0/${items.length}`;

  return wrap;
}

/* ---------- Gap fill (type the correct form) ------------------- */

/**
 * Type-the-answer gap fill with instant checking. Each item is a line
 * of segments; a string segment is literal text, an object segment
 * `{ answer, accept?, size? }` becomes an inline input. Checking marks
 * every blank right (green, locked) or wrong (red, still editable) —
 * the correct answer is never shown, matching the multiple-choice rule.
 *
 * @param {{ items: Array<{ hint?: string, segments: Array<string|{answer:string, accept?:string[], size?:number}> }> }} data
 */
export function createGapFill({ items }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-gap";

  const blanks = [];

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "exo-gap__item";

    const line = document.createElement("div");
    line.className = "exo-gap__line";
    for (const seg of item.segments) {
      if (typeof seg === "string") {
        const span = document.createElement("span");
        span.className = "exo-gap__text";
        span.textContent = seg;
        line.appendChild(span);
      } else {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "exo-gap__blank";
        input.size = seg.size ?? Math.max(6, (seg.answer?.length ?? 6) + 2);
        input.setAttribute("autocomplete", "off");
        input.setAttribute("autocapitalize", "off");
        input.spellcheck = false;
        const accepted = [seg.answer, ...(seg.accept ?? [])].map(norm);
        const blank = { input, accepted, done: false };
        input.addEventListener("input", () => {
          input.classList.remove("exo-gap__blank--right", "exo-gap__blank--wrong");
        });
        blanks.push(blank);
        line.appendChild(input);
      }
    }
    row.appendChild(line);

    if (item.hint) {
      const hint = document.createElement("p");
      hint.className = "exo-gap__hint";
      hint.textContent = item.hint;
      row.appendChild(hint);
    }
    wrap.appendChild(row);
  });

  const checkBtn = checkButton(wrap, () => {
    let right = 0;
    for (const b of blanks) {
      if (b.done) {
        right += 1;
        continue;
      }
      const ok = b.accepted.includes(norm(b.input.value));
      b.input.classList.toggle("exo-gap__blank--right", ok);
      b.input.classList.toggle("exo-gap__blank--wrong", !ok);
      if (ok) {
        b.done = true;
        b.input.disabled = true;
        right += 1;
      }
    }
    checkBtn.result(`${right} / ${blanks.length} correct`);
  });

  return wrap;
}

/* ---------- Profile builder (Step 4 challenge) ----------------- */

const PROFILE_FIELDS = ["username", "bio", "post1", "post2", "post3", "nevershare"];

/**
 * Interactive "Design your dream profile" challenge. A live preview
 * (avatar · @handle · bio · three post tiles · blurred never-share lock)
 * updates as the learner fills in a form; a progress bar tracks the six
 * fields and the "Save my profile" button unlocks once they're all done,
 * awarding points and flipping to a saved state.
 *
 * @param {{
 *   values: Record<string,string>,
 *   keyFor: (field: string) => string,
 *   onChange: (field: string, value: string) => void,
 * }} opts
 */
export function createProfileBuilder({ values, keyFor, onChange }) {
  const state = {};
  PROFILE_FIELDS.forEach((f) => (state[f] = values?.[f] ?? ""));
  let submitted = false;
  let points = 0;

  const wrap = document.createElement("div");
  wrap.className = "exo exo-profile";

  const grid = document.createElement("div");
  grid.className = "exo-profile__grid";
  wrap.appendChild(grid);

  /* ----- LEFT: live preview + never-share input ----- */
  const left = document.createElement("div");
  left.className = "exo-profile__left";

  const preview = document.createElement("article");
  preview.className = "exo-profile__preview";

  const idRow = document.createElement("div");
  idRow.className = "exo-profile__idrow";
  const avatar = document.createElement("div");
  avatar.className = "exo-profile__avatar";
  const idText = document.createElement("div");
  idText.className = "exo-profile__idtext";
  const handle = document.createElement("div");
  handle.className = "exo-profile__handle";
  const bioLine = document.createElement("div");
  bioLine.className = "exo-profile__bio";
  idText.append(handle, bioLine);
  idRow.append(avatar, idText);

  const postsGrid = document.createElement("div");
  postsGrid.className = "exo-profile__posts";
  const postTiles = [1, 2, 3].map((n) => {
    const tile = document.createElement("div");
    tile.className = `exo-profile__post exo-profile__post--${n}`;
    const tape = document.createElement("span");
    tape.className = "exo-profile__tape";
    const num = document.createElement("span");
    num.className = "exo-profile__post-num";
    num.textContent = n;
    const cap = document.createElement("span");
    cap.className = "exo-profile__post-cap";
    tile.append(tape, num, cap);
    postsGrid.appendChild(tile);
    return { tile, num, cap };
  });

  const lockRow = document.createElement("div");
  lockRow.className = "exo-profile__lock";
  lockRow.innerHTML =
    '<span class="exo-profile__lock-icon" aria-hidden="true">🔒</span>';
  const lockText = document.createElement("span");
  lockText.className = "exo-profile__lock-text";
  lockText.title = "Hover to reveal";
  lockRow.appendChild(lockText);

  preview.append(idRow, postsGrid, lockRow);
  left.appendChild(preview);

  const neverField = field(
    "One thing you'd NEVER share",
    "nevershare",
    "…and why not?",
    "exo-profile__field--danger",
  );
  left.appendChild(neverField.el);

  /* ----- RIGHT: form / saved state ----- */
  const right = document.createElement("div");
  right.className = "exo-profile__right";

  const form = document.createElement("div");
  form.className = "exo-profile__form";

  const fUser = field("Username", "username", "e.g. quietcomet");
  const fBio = field("Bio", "bio", "One line about who you are");
  const fPost1 = field("Post 1 — what's it of, and why?", "post1", "Describe your first post");
  const twoUp = document.createElement("div");
  twoUp.className = "exo-profile__twoup";
  const fPost2 = field("Post 2", "post2", "Your second post");
  const fPost3 = field("Post 3", "post3", "Your third post");
  twoUp.append(fPost2.el, fPost3.el);

  const progress = document.createElement("div");
  progress.className = "exo-profile__progress";
  const barTrack = document.createElement("div");
  barTrack.className = "exo-profile__bar";
  const barFill = document.createElement("div");
  barFill.className = "exo-profile__bar-fill";
  barTrack.appendChild(barFill);
  const progLabel = document.createElement("span");
  progLabel.className = "exo-profile__prog-label";
  progress.append(barTrack, progLabel);

  const actions = document.createElement("div");
  actions.className = "exo-profile__actions";
  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "exo-profile__save";
  saveBtn.textContent = "Save my profile";
  const pop = document.createElement("span");
  pop.className = "exo-profile__pop";
  pop.textContent = "+10";
  saveBtn.appendChild(pop);
  actions.appendChild(saveBtn);

  form.append(fUser.el, fBio.el, fPost1.el, twoUp, progress, actions);

  const saved = document.createElement("div");
  saved.className = "exo-profile__saved";
  saved.innerHTML =
    '<div class="exo-profile__saved-card">' +
    '<span class="exo-profile__saved-check" aria-hidden="true">✓</span>' +
    '<div><div class="exo-profile__saved-title">Profile saved!</div>' +
    '<p class="exo-profile__saved-text">Your dream profile is complete — check the live preview.</p></div></div>';
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "exo-profile__edit";
  editBtn.textContent = "Edit profile";
  saved.appendChild(editBtn);

  right.append(form, saved);
  grid.append(left, right);

  const inputs = [fUser, fBio, fPost1, fPost2, fPost3, neverField];

  /** One labelled input; wires persistence + live preview. */
  function field(labelText, key, placeholder, extraClass) {
    const el = document.createElement("label");
    el.className = "exo-profile__field" + (extraClass ? ` ${extraClass}` : "");
    const cap = document.createElement("span");
    cap.className = "exo-profile__label";
    cap.textContent = labelText;
    const input = document.createElement("input");
    input.type = "text";
    input.className = "exo-profile__input";
    input.placeholder = placeholder;
    input.value = state[key];
    input.dataset.answerKey = keyFor(key);
    input.addEventListener("input", () => {
      state[key] = input.value;
      onChange(key, input.value);
      update();
    });
    el.append(cap, input);
    return { el, input, key };
  }

  function update() {
    const uname = state.username.trim();
    avatar.textContent = (uname ? uname.slice(0, 2) : "?").toUpperCase();
    handle.textContent = "@" + (uname || "yourname");
    bioLine.textContent = state.bio.trim() || "Your bio goes here…";

    [state.post1, state.post2, state.post3].forEach((raw, i) => {
      const text = raw.trim();
      const t = postTiles[i];
      t.tile.classList.toggle("is-filled", text.length > 0);
      t.cap.textContent = text;
    });

    lockText.textContent = state.nevershare.trim() || "never-share item";

    const filled = PROFILE_FIELDS.filter((f) => state[f].trim().length > 0).length;
    barFill.style.width = `${Math.round((filled / 6) * 100)}%`;
    barFill.dataset.level = String(filled);
    let msg = "Let's build your profile…";
    if (filled === 6) msg = "Ready to save!";
    else if (filled >= 4) msg = "Almost there!";
    else if (filled >= 2) msg = "Looking good!";
    else if (filled >= 1) msg = "Nice start!";
    progLabel.textContent = `${filled}/6 · ${msg}`;
    saveBtn.disabled = filled < 6 || submitted;
  }

  function setSubmitted(on) {
    submitted = on;
    wrap.classList.toggle("exo-profile--saved", on);
    neverField.input.disabled = on;
    inputs.forEach((f) => (f.input.disabled = on));
    update();
  }

  saveBtn.addEventListener("click", () => {
    if (saveBtn.disabled) return;
    points += 10;
    pop.classList.remove("exo-profile__pop--go");
    // reflow so the animation restarts each save
    void pop.offsetWidth;
    pop.classList.add("exo-profile__pop--go");
    setSubmitted(true);
  });
  editBtn.addEventListener("click", () => setSubmitted(false));

  update();
  return wrap;
}

/* ---------- Email builder (official-email challenge) ----------- */

const EMAIL_FIELDS = ["subject", "dear", "reason", "q1", "q2", "name"];

/**
 * Interactive "write your own official email" challenge. A form on the
 * right fills a live email preview on the left (To/Subject header + a
 * properly laid-out formal email); a progress bar tracks the six parts
 * and the "Send my email" button unlocks once they're all present,
 * awarding points and flipping to a sent state.
 *
 * @param {{
 *   to?: string,
 *   values: Record<string,string>,
 *   keyFor: (field: string) => string,
 *   onChange: (field: string, value: string) => void,
 * }} opts
 */
export function createEmailBuilder({ to, values, keyFor, onChange }) {
  const state = {};
  EMAIL_FIELDS.forEach((f) => (state[f] = values?.[f] ?? ""));
  let submitted = false;
  let points = 0;

  const wrap = document.createElement("div");
  wrap.className = "exo exo-email";

  const grid = document.createElement("div");
  grid.className = "exo-email__grid";
  wrap.appendChild(grid);

  /* ----- LEFT: live email preview ----- */
  const left = document.createElement("div");
  left.className = "exo-email__left";

  const pvCap = document.createElement("div");
  pvCap.className = "exo-email__pv-cap";
  pvCap.textContent = "Live preview";

  const mail = document.createElement("article");
  mail.className = "exo-email__mail";

  const head = document.createElement("div");
  head.className = "exo-email__mail-head";
  const toLine = document.createElement("div");
  toLine.innerHTML = `<span>To:</span> ${to ?? "info@example.com.au"}`;
  const subjLine = document.createElement("div");
  subjLine.className = "exo-email__subj-line";
  const subjVal = document.createElement("span");
  subjLine.innerHTML = "<span>Subject:</span> ";
  subjLine.appendChild(subjVal);
  head.append(toLine, subjLine);

  const bodyEl = document.createElement("div");
  bodyEl.className = "exo-email__mail-body";
  const lDear = line("Dear ", "dear", ",");
  const lReason = line("I am writing because ", "reason", "");
  const lQ1 = line("Could you please tell me ", "q1", "");
  const lQ2 = line("Could you also tell me ", "q2", "");
  const lThanks = document.createElement("div");
  lThanks.textContent = "Thank you very much.";
  lThanks.className = "exo-email__fixed";
  const lYours = document.createElement("div");
  lYours.textContent = "Yours sincerely,";
  lYours.className = "exo-email__fixed exo-email__fixed--gap";
  const lName = document.createElement("div");
  lName.className = "exo-email__name";
  bodyEl.append(lDear.el, lReason.el, lQ1.el, lQ2.el, lThanks, lYours, lName);

  mail.append(head, bodyEl);
  left.append(pvCap, mail);

  /* ----- RIGHT: form / sent state ----- */
  const right = document.createElement("div");
  right.className = "exo-email__right";

  const form = document.createElement("div");
  form.className = "exo-email__form";
  const fSubject = field("Subject · Betreff", "subject", "", false);
  const fDear = field("Salutation · Anrede", "dear", "", false);
  const fReason = field("I am writing because … · Ich schreibe, weil …", "reason", "", true);
  const fQ1 = field("Could you please tell me …? · Frage 1", "q1", "", true);
  const fQ2 = field("Could you also tell me …? · Frage 2", "q2", "", true);
  const fName = field("Your full name · Dein voller Name", "name", "", false);

  const progress = document.createElement("div");
  progress.className = "exo-email__progress";
  const barTrack = document.createElement("div");
  barTrack.className = "exo-email__bar";
  const barFill = document.createElement("div");
  barFill.className = "exo-email__bar-fill";
  barTrack.appendChild(barFill);
  const progLabel = document.createElement("span");
  progLabel.className = "exo-email__prog-label";
  progress.append(barTrack, progLabel);

  const actions = document.createElement("div");
  actions.className = "exo-email__actions";
  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "exo-email__save";
  saveBtn.textContent = "Send my email";
  const pop = document.createElement("span");
  pop.className = "exo-email__pop";
  pop.textContent = "+10";
  saveBtn.appendChild(pop);
  actions.appendChild(saveBtn);

  form.append(fSubject.el, fDear.el, fReason.el, fQ1.el, fQ2.el, fName.el, progress, actions);

  const sent = document.createElement("div");
  sent.className = "exo-email__sent";
  sent.innerHTML =
    '<div class="exo-email__sent-card">' +
    '<span class="exo-email__sent-check" aria-hidden="true">✓</span>' +
    '<div><div class="exo-email__sent-title">Email ready to send!</div>' +
    '<p class="exo-email__sent-text">All six parts are there — check the live preview.</p></div></div>';
  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "exo-email__edit";
  editBtn.textContent = "Edit email";
  sent.appendChild(editBtn);

  right.append(form, sent);
  grid.append(left, right);

  const inputs = [fSubject, fDear, fReason, fQ1, fQ2, fName];

  /** A preview line: fixed prefix + editable value span + suffix. */
  function line(prefix, key, suffix) {
    const el = document.createElement("div");
    el.className = "exo-email__line";
    const pre = document.createElement("span");
    pre.textContent = prefix;
    const val = document.createElement("span");
    val.className = "exo-email__val";
    const suf = document.createElement("span");
    suf.textContent = suffix;
    el.append(pre, val, suf);
    return { el, val, suf };
  }

  /** One labelled input/textarea; wires persistence + live preview. */
  function field(labelText, key, placeholder, multiline) {
    const el = document.createElement("label");
    el.className = "exo-email__field";
    const cap = document.createElement("span");
    cap.className = "exo-email__label";
    cap.textContent = labelText;
    const input = document.createElement(multiline ? "textarea" : "input");
    if (!multiline) input.type = "text";
    else input.rows = 2;
    input.className = "exo-email__input";
    input.placeholder = placeholder;
    input.value = state[key];
    input.dataset.answerKey = keyFor(key);
    input.addEventListener("input", () => {
      state[key] = input.value;
      onChange(key, input.value);
      update();
    });
    el.append(cap, input);
    return { el, input, key };
  }

  const PLACE = {
    subject: "…",
    dear: "…",
    reason: "…",
    q1: "…",
    q2: "…",
    name: "…",
  };

  function setVal(node, key) {
    const v = state[key].trim();
    node.textContent = v || PLACE[key];
    node.classList.toggle("exo-email__val--empty", !v);
  }

  function update() {
    setVal(subjVal, "subject");
    setVal(lDear.val, "dear");
    setVal(lReason.val, "reason");
    setVal(lQ1.val, "q1");
    setVal(lQ2.val, "q2");
    const nm = state.name.trim();
    lName.textContent = nm || "Your full name";
    lName.classList.toggle("exo-email__val--empty", !nm);

    const filled = EMAIL_FIELDS.filter((f) => state[f].trim().length > 0).length;
    barFill.style.width = `${Math.round((filled / 6) * 100)}%`;
    barFill.dataset.level = String(filled);
    let msg = "Start your email…";
    if (filled === 6) msg = "Ready to send!";
    else if (filled >= 4) msg = "Almost there!";
    else if (filled >= 2) msg = "Looking good!";
    else if (filled >= 1) msg = "Nice start!";
    progLabel.textContent = `${filled}/6 · ${msg}`;
    saveBtn.disabled = filled < 6 || submitted;
  }

  function setSubmitted(on) {
    submitted = on;
    wrap.classList.toggle("exo-email--sent", on);
    inputs.forEach((f) => (f.input.disabled = on));
    update();
  }

  saveBtn.addEventListener("click", () => {
    if (saveBtn.disabled) return;
    points += 10;
    pop.classList.remove("exo-email__pop--go");
    void pop.offsetWidth;
    pop.classList.add("exo-email__pop--go");
    setSubmitted(true);
  });
  editBtn.addEventListener("click", () => setSubmitted(false));

  update();
  return wrap;
}

/* ---------- Email fixer (spot the problems + rewrite) ---------- */

const FIXER_FIELDS = ["subject", "body"];

/**
 * "Fix the bad email" task. The left panel shows a messy draft as an
 * email card whose lines can each be tapped to flag a problem (a live
 * counter tracks how many were found). The right panel is a clean
 * compose window (To fixed, Subject input, body textarea) where the
 * learner rewrites the email formally; a word count + status pill give
 * feedback. Flags and both text fields persist.
 *
 * @param {{
 *   draft: { from?: string, initial?: string, time?: string, to?: string, lines: string[] },
 *   to?: string,
 *   subjectPlaceholder?: string,
 *   bodyPlaceholder?: string,
 *   values: Record<string,string>,
 *   keyFor: (field: string) => string,
 *   onChange: (field: string, value: string) => void,
 * }} opts
 */
export function createEmailFixer({ draft, to, subjectPlaceholder, bodyPlaceholder, values, keyFor, onChange }) {
  const toAddr = to ?? draft?.to ?? "info@example.com.au";
  const state = { subject: values?.subject ?? "", body: values?.body ?? "" };
  const flags = new Set(
    (values?.flags ?? "")
      .split(",")
      .map((s) => parseInt(s, 10))
      .filter((n) => Number.isInteger(n)),
  );

  const wrap = document.createElement("div");
  wrap.className = "exo exo-fix";
  const grid = document.createElement("div");
  grid.className = "exo-fix__grid";
  wrap.appendChild(grid);

  /* ----- LEFT: the messy draft, tap to flag ----- */
  const left = document.createElement("div");
  left.className = "exo-fix__left";
  const capL = document.createElement("div");
  capL.className = "exo-fix__cap exo-fix__cap--bad";
  capL.innerHTML = "<span>Ben's draft</span> · tap each problem";

  const mail = document.createElement("article");
  mail.className = "exo-fix__mail";
  const mHead = document.createElement("div");
  mHead.className = "exo-fix__mail-head";
  const avatar = document.createElement("div");
  avatar.className = "exo-fix__avatar";
  avatar.textContent = draft?.initial ?? (draft?.from ?? "B").charAt(0);
  const fromBox = document.createElement("div");
  fromBox.className = "exo-fix__from";
  fromBox.innerHTML =
    `<div class="exo-fix__from-top"><span class="exo-fix__from-name">${draft?.from ?? "Ben Fischer"}</span>` +
    `<span class="exo-fix__time">${draft?.time ?? ""}</span></div>` +
    `<div class="exo-fix__toline">to <span>${toAddr}</span></div>`;
  mHead.append(avatar, fromBox);

  const linesBox = document.createElement("div");
  linesBox.className = "exo-fix__lines";

  const count = document.createElement("div");
  count.className = "exo-fix__count";

  const paintCount = () => {
    const n = flags.size;
    count.textContent = n === 0 ? "No problems flagged yet" : `${n} problem${n === 1 ? "" : "s"} flagged`;
    count.classList.toggle("exo-fix__count--on", n > 0);
  };

  (draft?.lines ?? []).forEach((text, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "exo-fix__line";
    const dot = document.createElement("span");
    dot.className = "exo-fix__dot";
    const span = document.createElement("span");
    span.className = "exo-fix__linetext";
    span.textContent = text;
    btn.append(dot, span);
    const paint = () => {
      const on = flags.has(i);
      btn.classList.toggle("exo-fix__line--on", on);
      dot.textContent = on ? "!" : "";
    };
    btn.addEventListener("click", () => {
      if (flags.has(i)) flags.delete(i);
      else flags.add(i);
      paint();
      paintCount();
      onChange("flags", [...flags].sort((a, b) => a - b).join(","));
    });
    paint();
    linesBox.appendChild(btn);
  });
  paintCount();

  mail.append(mHead, linesBox);
  left.append(capL, mail, count);

  /* ----- RIGHT: clean compose window ----- */
  const right = document.createElement("div");
  right.className = "exo-fix__right";
  const capR = document.createElement("div");
  capR.className = "exo-fix__cap exo-fix__cap--ok";
  capR.innerHTML = "<span>Your corrected version</span>";

  const compose = document.createElement("article");
  compose.className = "exo-fix__compose";
  const rowTo = document.createElement("div");
  rowTo.className = "exo-fix__crow";
  rowTo.innerHTML = `<span class="exo-fix__clabel">To</span><span class="exo-fix__cto">${toAddr}</span>`;
  const rowSubj = document.createElement("div");
  rowSubj.className = "exo-fix__crow";
  const subjLabel = document.createElement("span");
  subjLabel.className = "exo-fix__clabel";
  subjLabel.textContent = "Subject";
  const subject = document.createElement("input");
  subject.type = "text";
  subject.className = "exo-fix__subject";
  subject.placeholder = subjectPlaceholder ?? "Add a subject";
  subject.spellcheck = false;
  subject.value = state.subject;
  subject.dataset.answerKey = keyFor("subject");
  rowSubj.append(subjLabel, subject);
  const bodyArea = document.createElement("textarea");
  bodyArea.className = "exo-fix__body";
  bodyArea.placeholder = bodyPlaceholder ?? "Dear Sir or Madam,\n\n…";
  bodyArea.spellcheck = false;
  bodyArea.value = state.body;
  bodyArea.dataset.answerKey = keyFor("body");
  compose.append(rowTo, rowSubj, bodyArea);

  const meter = document.createElement("div");
  meter.className = "exo-fix__meter";
  const words = document.createElement("span");
  words.className = "exo-fix__words";
  const status = document.createElement("span");
  status.className = "exo-fix__status";
  meter.append(words, status);

  const paintMeter = () => {
    const n = state.body.trim() ? state.body.trim().split(/\s+/).filter(Boolean).length : 0;
    words.textContent = `${n} word${n === 1 ? "" : "s"}`;
    let level = "draft", label = "Draft";
    if (n >= 60) { level = "ok"; label = "Looking good ✓"; }
    else if (n > 0) { level = "go"; label = "Keep going…"; }
    status.dataset.level = level;
    status.textContent = label;
  };

  subject.addEventListener("input", () => {
    state.subject = subject.value;
    onChange("subject", subject.value);
  });
  bodyArea.addEventListener("input", () => {
    state.body = bodyArea.value;
    onChange("body", bodyArea.value);
    paintMeter();
  });

  right.append(capR, compose, meter);
  grid.append(left, right);
  paintMeter();

  return wrap;
}

/* ---------- shared bits ---------------------------------------- */

/** Normalise a typed answer: trim, lowercase, unify apostrophes, collapse spaces. */
function norm(s) {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, " ");
}

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

/* ================= Spot-Fix (find & correct N errors) ============
 * A text with a fixed number of planted mistakes. Every word is
 * editable, so which words are wrong is never revealed; the learner
 * hunts, retypes, and presses Check. Feedback is a COUNT only ("Fixed
 * 3 / 5") — correctly fixed words lock green, the rest stay untouched,
 * so answers are never given away. Used for Grammar "Fix the tense"
 * and Listening "Transcript detective" (with an audio track above).
 * ============================================================ */

const normSpot = (s) =>
  (s ?? "").trim().toLowerCase().replace(/[.,!?;:„“”"'»«()]/g, "").replace(/\s+/g, " ");

export function createSpotFix({ paragraphs, fixes, hint, checkLabel = "Check" }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-spot";

  if (hint) {
    const h = document.createElement("p");
    h.className = "exo-spot__hint";
    h.textContent = hint;
    wrap.appendChild(h);
  }

  const textEl = document.createElement("div");
  textEl.className = "exo-spot__text";
  wrap.appendChild(textEl);

  const words = [];

  const editWord = (span) => {
    if (span.classList.contains("exo-spot__word--fixed")) return;
    const input = document.createElement("input");
    input.className = "exo-spot__input";
    input.value = span.textContent;
    input.size = Math.max(3, input.value.length);
    input.setAttribute("aria-label", "Correct this word");
    input.addEventListener("input", () => (input.size = Math.max(3, input.value.length)));
    const commit = () => {
      span.textContent = input.value;
      span.classList.toggle(
        "exo-spot__word--edited",
        normSpot(input.value) !== normSpot(span.dataset.original),
      );
      input.replaceWith(span);
    };
    input.addEventListener("blur", commit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        input.blur();
      }
    });
    span.replaceWith(input);
    input.focus();
    input.select();
  };

  const makeWord = (core) => {
    const span = document.createElement("span");
    span.className = "exo-spot__word";
    span.textContent = core;
    span.dataset.original = core;
    span.tabIndex = 0;
    span.addEventListener("click", () => editWord(span));
    span.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        editWord(span);
      }
    });
    return span;
  };

  // Render paragraphs: split each word from its surrounding punctuation so
  // the editable core stays clean.
  paragraphs.forEach((para) => {
    const p = document.createElement("p");
    p.className = "exo-spot__para";
    para.split(/(\s+)/).forEach((tok) => {
      if (tok === "" || /^\s+$/.test(tok)) {
        p.appendChild(document.createTextNode(tok));
        return;
      }
      const [, lead, core, trail] = tok.match(/^([^0-9A-Za-zÀ-ſ]*)(.*?)([^0-9A-Za-zÀ-ſ]*)$/);
      if (lead) p.appendChild(document.createTextNode(lead));
      if (core) {
        const span = makeWord(core);
        p.appendChild(span);
        words.push(span);
      }
      if (trail) p.appendChild(document.createTextNode(trail));
    });
    textEl.appendChild(p);
  });

  // Assign each planted fix to the next matching word (order handles
  // duplicates). The tagging is internal — nothing visible marks a target.
  fixes.forEach((fix) => {
    const target = words.find(
      (s) => !s.dataset.correct && normSpot(s.dataset.original) === normSpot(fix.wrong),
    );
    if (!target) return;
    target.dataset.correct = fix.correct;
    target.dataset.accept = JSON.stringify([fix.correct, ...(fix.accept ?? [])].map(normSpot));
  });

  const footer = document.createElement("div");
  footer.className = "exo-spot__footer";
  const checkBtn = document.createElement("button");
  checkBtn.className = "exo-spot__check";
  checkBtn.textContent = checkLabel;
  const status = document.createElement("span");
  status.className = "exo-spot__status";
  const total = fixes.length;
  status.textContent = `${total} mistakes are hidden in the text.`;
  footer.append(checkBtn, status);
  wrap.appendChild(footer);

  checkBtn.addEventListener("click", () => {
    let fixed = 0;
    words.forEach((s) => {
      if (!s.dataset.correct) return;
      const accept = JSON.parse(s.dataset.accept);
      if (accept.includes(normSpot(s.textContent))) {
        s.classList.add("exo-spot__word--fixed");
        s.classList.remove("exo-spot__word--edited");
        fixed += 1;
      }
    });
    if (fixed === total) {
      status.textContent = `Perfect — you found all ${total}! ✓`;
      status.classList.add("exo-spot__status--done");
    } else {
      status.textContent = `Fixed ${fixed} / ${total} — keep looking, some mistakes are still hidden.`;
      status.classList.remove("exo-spot__status--done");
    }
  });

  return wrap;
}

/* ================= Poster builder (live preview) ================
 * A small artifact builder: the learner fills a headline, a subheading,
 * three tips and an emergency line, and watches a safety poster build
 * itself live. Product-based (feeds the PDF); no right/wrong. Used for
 * the Vocabulary "Build the safety poster" challenge.
 * ============================================================ */

export const POSTER_FIELDS = ["headline", "subhead", "tip1", "tip2", "tip3", "emergency"];

export function createPosterBuilder({ values, keyFor, onChange, prompts = {} }) {
  const p = {
    headline: { label: "Poster headline", placeholder: "BUSHFIRE — STAY SAFE" },
    subhead: { label: "One-line subheading", placeholder: "What to do when a fire is near" },
    tip1: { label: "Safety tip 1", placeholder: "Pack water, papers and a torch." },
    tip2: { label: "Safety tip 2", placeholder: "Close all windows and doors." },
    tip3: { label: "Safety tip 3", placeholder: "Listen to the radio for news." },
    emergency: { label: "Emergency line", placeholder: "Call 000 · Stay informed" },
  };
  POSTER_FIELDS.forEach((f) => Object.assign(p[f], prompts[f] ?? {}));

  const state = {};
  POSTER_FIELDS.forEach((f) => (state[f] = values?.[f] ?? ""));

  const wrap = document.createElement("div");
  wrap.className = "exo exo-poster";
  const grid = document.createElement("div");
  grid.className = "exo-poster__grid";
  wrap.appendChild(grid);

  // LEFT: live poster preview
  const left = document.createElement("div");
  left.className = "exo-poster__left";
  const pvCap = document.createElement("div");
  pvCap.className = "exo-poster__pv-cap";
  pvCap.textContent = "Live poster";
  const poster = document.createElement("article");
  poster.className = "exo-poster__poster";
  const pHead = document.createElement("h4");
  pHead.className = "exo-poster__headline";
  const pSub = document.createElement("p");
  pSub.className = "exo-poster__subhead";
  const pList = document.createElement("ul");
  pList.className = "exo-poster__tips";
  const tipEls = ["tip1", "tip2", "tip3"].map(() => {
    const li = document.createElement("li");
    li.className = "exo-poster__tip";
    pList.appendChild(li);
    return li;
  });
  const pEmg = document.createElement("div");
  pEmg.className = "exo-poster__emg";
  poster.append(pHead, pSub, pList, pEmg);
  left.append(pvCap, poster);

  // RIGHT: form
  const right = document.createElement("div");
  right.className = "exo-poster__right";
  const form = document.createElement("div");
  form.className = "exo-poster__form";
  POSTER_FIELDS.forEach((f) => {
    const label = document.createElement("label");
    label.className = "exo-poster__field";
    const cap = document.createElement("span");
    cap.className = "exo-poster__flabel";
    cap.textContent = p[f].label;
    const el = document.createElement("input");
    el.type = "text";
    el.className = "exo-poster__input";
    el.placeholder = p[f].placeholder;
    el.value = state[f];
    el.dataset.answerKey = keyFor(f);
    el.addEventListener("input", () => {
      state[f] = el.value;
      onChange(f, el.value);
      update();
    });
    label.append(cap, el);
    form.appendChild(label);
  });
  right.appendChild(form);

  grid.append(left, right);

  function update() {
    pHead.textContent = state.headline || p.headline.placeholder;
    pHead.classList.toggle("exo-poster__ghost", !state.headline);
    pSub.textContent = state.subhead || p.subhead.placeholder;
    pSub.classList.toggle("exo-poster__ghost", !state.subhead);
    ["tip1", "tip2", "tip3"].forEach((f, i) => {
      tipEls[i].textContent = state[f] || p[f].placeholder;
      tipEls[i].classList.toggle("exo-poster__ghost", !state[f]);
    });
    pEmg.textContent = state.emergency || p.emergency.placeholder;
    pEmg.classList.toggle("exo-poster__ghost", !state.emergency);
  }
  update();

  return wrap;
}
