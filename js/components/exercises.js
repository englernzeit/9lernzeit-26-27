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
