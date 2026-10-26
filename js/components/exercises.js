/**
 * Interactive exercise widgets for competence pages — vanilla JS,
 * each self-checking with immediate feedback. Rebuilt from the Unit 4
 * material (see memory: unit4-material-is-direction-not-spec).
 *
 * Every factory returns a DOM element the card renderer drops in.
 * Journal styling lives in css/components/exercises.css.
 */

/* ---------- Shuffling ------------------------------------------ *
 * Options and draggable chips are shuffled with a REAL random order
 * (Math.random), freshly each time a card is built — so every learner
 * gets a different sequence and can't just copy "it's the third one"
 * from a neighbour. The correct answer always travels with its option,
 * so shuffling never changes what is right.
 */

/** Fisher–Yates shuffle, in place. */
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Shuffle a copy, leaving the original array untouched. */
const shuffledCopy = (arr) => shuffleInPlace(arr.slice());

/**
 * Shuffle in place for ORDERING tasks: never leaves the array in its
 * original order, so the correct sequence is never shown by accident.
 * `keyOf` maps an item to a stable comparable value.
 */
function shuffleOrder(arr, keyOf = (x) => x) {
  if (arr.length < 2) return arr;
  const original = arr.map(keyOf);
  let guard = 0;
  do {
    shuffleInPlace(arr);
    guard += 1;
  } while (guard < 25 && arr.every((x, i) => keyOf(x) === original[i]));
  return arr;
}

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

  // A long text (a whole article) gets a compact type size, so the big
  // A1 style made for a few short sentences doesn't blow the card up.
  const chars = paragraphs.flat().reduce((n, seg) => n + (typeof seg === "string" ? seg : seg.w ?? "").length, 0);
  if (chars > 800) wrap.classList.add("exo-glossary--long");

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
    // Optional German support line (LE)
    if (question.de) {
      const de = document.createElement("p");
      de.className = "exo-de";
      de.textContent = question.de;
      block.appendChild(de);
    }

    const opts = document.createElement("div");
    opts.className = "exo-mc__opts";
    let solved = false;

    // Shuffle the options randomly so the correct answer isn't always in
    // the same position. The answer is still never revealed — only the
    // picked option is marked right or wrong.
    const order = shuffleInPlace(
      question.options.map((label, i) => ({ label, correct: i === question.correct })),
    );

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

  // Flatten items with their correct group, then shuffle randomly.
  // An item is a plain string, or `{ image, label? }` for a picture chip.
  const items = [];
  groups.forEach((g, gi) => g.items.forEach((it) => items.push({ item: it, group: gi })));
  shuffleInPlace(items);

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
    // random shuffle that never leaves the tokens already in order
    const shuffled = shuffleOrder(
      sentence.tokens.map((t, i) => ({ t, i })),
      (o) => o.i,
    );

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
 * @param {{ src: string, label?: string, transcript?: string[] }} data
 */
export function createAudioPlayer({ src, label, transcript }) {
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

  // Optional transcript behind a "Show text" toggle (hidden by default,
  // so it stays a listening task)
  if (transcript?.length) {
    wrap.classList.add("exo-audio--with-text");
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "exo-audio__text-toggle";
    toggle.textContent = "Show text";
    const text = document.createElement("div");
    text.className = "exo-audio__transcript";
    text.hidden = true;
    for (const line of transcript) {
      const p = document.createElement("p");
      p.textContent = line;
      text.appendChild(p);
    }
    toggle.addEventListener("click", () => {
      text.hidden = !text.hidden;
      toggle.textContent = text.hidden ? "Show text" : "Hide text";
    });
    wrap.append(toggle, text);
  }

  return wrap;
}

/* ---------- Read-aloud "listen" player (Web Speech API) -------- */

/**
 * A listening player with no audio file: the browser reads the transcript
 * aloud, exactly like "the read-aloud function on your phone" from the
 * source. Same look as the audio player (round play button + progress
 * bar). A "Show text" toggle reveals the transcript (hidden by default so
 * it is listening, not reading). Degrades gracefully where the Web Speech
 * API is missing (shows the text with a note to have someone read it).
 *
 * @param {{ label?: string, note?: string, lines: Array<string | {speaker?: string, text: string}> }} opts
 */
export function createReadAloud({ label, note, lines }) {
  const items = (lines ?? []).map((l) =>
    typeof l === "string" ? l : `${l.speaker ? `${l.speaker}: ` : ""}${l.text}`,
  );

  const wrap = document.createElement("div");
  wrap.className = "exo-audio exo-audio--tts";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "exo-audio__btn";
  btn.setAttribute("aria-label", "Listen");
  btn.textContent = "▶";

  const body = document.createElement("div");
  body.className = "exo-audio__body";
  const cap = document.createElement("div");
  cap.className = "exo-audio__label";
  cap.textContent = label ?? "Listen — read aloud";
  const bar = document.createElement("div");
  bar.className = "exo-audio__bar";
  const fill = document.createElement("div");
  fill.className = "exo-audio__fill";
  bar.appendChild(fill);
  const status = document.createElement("div");
  status.className = "exo-audio__time";
  status.textContent = note ?? "You hear it twice. Press play.";
  body.append(cap, bar, status);

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "exo-audio__text-toggle";
  toggle.textContent = "Show text";

  const text = document.createElement("div");
  text.className = "exo-audio__transcript";
  text.hidden = true;
  for (const line of items) {
    const p = document.createElement("p");
    p.textContent = line;
    text.appendChild(p);
  }
  toggle.addEventListener("click", () => {
    text.hidden = !text.hidden;
    toggle.textContent = text.hidden ? "Show text" : "Hide text";
  });

  wrap.append(btn, body, toggle, text);

  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;
  if (!synth) {
    // No speech synthesis — fall back to the transcript, always visible.
    status.textContent = "Your browser can't read aloud — have someone read the text, or use your phone.";
    text.hidden = false;
    toggle.hidden = true;
    return wrap;
  }

  // Pick an English voice once they are available.
  let voice = null;
  const pickVoice = () => {
    const voices = synth.getVoices();
    voice =
      voices.find((v) => /en[-_]GB/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      voices[0] ||
      null;
  };
  pickVoice();
  synth.addEventListener?.("voiceschanged", pickVoice);

  let playing = false;
  let idx = 0;

  const setPlaying = (on) => {
    playing = on;
    btn.textContent = on ? "■" : "▶";
    btn.setAttribute("aria-label", on ? "Stop" : "Listen");
    wrap.classList.toggle("exo-audio--playing", on);
  };

  const stop = () => {
    synth.cancel();
    setPlaying(false);
    fill.style.width = "0%";
    status.textContent = note ?? "You hear it twice. Press play.";
  };

  const speakFrom = (start) => {
    idx = start;
    const speakNext = () => {
      if (!playing || idx >= items.length) {
        if (idx >= items.length) stop();
        return;
      }
      const u = new SpeechSynthesisUtterance(items[idx]);
      u.lang = (voice && voice.lang) || "en-GB";
      if (voice) u.voice = voice;
      u.rate = 0.95;
      u.onend = () => {
        idx += 1;
        fill.style.width = `${Math.round((idx / items.length) * 100)}%`;
        status.textContent = `${Math.min(idx + 1, items.length)} / ${items.length}`;
        speakNext();
      };
      u.onerror = () => stop();
      synth.speak(u);
    };
    speakNext();
  };

  btn.addEventListener("click", () => {
    if (playing) {
      stop();
      return;
    }
    synth.cancel();
    setPlaying(true);
    status.textContent = `1 / ${items.length}`;
    speakFrom(0);
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
  // Random shuffle of the words so they don't sit under their picture
  const words = shuffleInPlace(pairs.map((p) => p.word));
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
  // Present the events in a random order that is never the answer order.
  const shown = shuffleOrder(
    events.map((e, i) => ({ text: e.text, de: e.de, correct: i + 1 })),
    (e) => e.correct,
  );

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
    // Optional German support line (LE)
    if (e.de) {
      const de = document.createElement("span");
      de.className = "exo-de";
      de.textContent = e.de;
      text.appendChild(de);
    }
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

    // Shuffle the choices so the answer isn't always in the same slot.
    const gapOptions = shuffledCopy(gap.options);

    let getValue;
    if (gapOptions.length <= 3) {
      const btns = gapOptions.map((opt) => {
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
      gapOptions.forEach((opt) => {
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

  // Shuffle the option list so its order never mirrors the rows' answers.
  const shownOptions = shuffledCopy(options);

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
    for (const opt of shownOptions) {
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

  // Random shuffle of the right column so answers aren't row-aligned.
  const order = shuffleOrder(pairs.map((_, i) => i));

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

  const rows = shuffledCopy(args).map((arg) => {
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

/* ---------- Word Master (one new word per sentence) ------------ */

/** Edit distance, capped: enough to tell "almost — a typo" from "wrong". */
function editDistance(a, b, cap = 3) {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > cap) return cap + 1;
    prev = cur;
  }
  return prev[b.length];
}

/** "Bitte **lösch** das Foto" → text nodes with the **word** in <strong>. */
function appendBolded(el, text) {
  text.split(/\*\*(.+?)\*\*/).forEach((part, i) => {
    if (!part) return;
    if (i % 2) {
      const b = document.createElement("strong");
      b.textContent = part;
      el.appendChild(b);
    } else {
      el.appendChild(document.createTextNode(part));
    }
  });
}

/**
 * Word Master as a task card: each row is a German sentence with the new
 * word in **bold** and the English sentence with a gap for just that word
 * ("___"). Like every self-check here, the answer is never shown: right
 * gaps lock green, a 1-letter slip turns amber ("check your spelling"),
 * anything else red. `wordBox: true` adds the shuffled words as help (LE).
 *
 * @param {{ items: Array<{ de: string, en: string, answer: string, accept?: string[] }>, wordBox?: boolean }} data
 */
export function createWordMasterCard({ items, wordBox }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-wm";

  if (wordBox) {
    const box = document.createElement("div");
    box.className = "exo-wm__box";
    for (const w of shuffledCopy(items.map((it) => it.answer))) {
      const chip = document.createElement("span");
      chip.className = "exo-wm__chip";
      chip.textContent = w;
      box.appendChild(chip);
    }
    wrap.appendChild(box);
  }

  const list = document.createElement("div");
  list.className = "exo-wm__list";
  wrap.appendChild(list);

  const rows = items.map((item, i) => {
    const row = document.createElement("div");
    row.className = "exo-wm__item";

    const de = document.createElement("p");
    de.className = "exo-wm__de";
    const num = document.createElement("span");
    num.className = "exo-wm__num";
    num.textContent = String(i + 1);
    de.appendChild(num);
    appendBolded(de, item.de);

    const en = document.createElement("p");
    en.className = "exo-wm__en";
    const [before, after = ""] = item.en.split("___");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "exo-wm__gap";
    input.size = Math.max(7, item.answer.length + 1);
    input.setAttribute("autocomplete", "off");
    input.setAttribute("autocapitalize", "off");
    input.spellcheck = false;
    if (before) en.appendChild(document.createTextNode(before));
    en.appendChild(input);
    if (after) en.appendChild(document.createTextNode(after));

    const note = document.createElement("p");
    note.className = "exo-wm__note";

    input.addEventListener("input", () => {
      row.classList.remove("exo-wm__item--wrong", "exo-wm__item--near");
      note.textContent = "";
    });

    row.append(de, en, note);
    list.appendChild(row);
    return { row, input, note, accepted: [item.answer, ...(item.accept ?? [])].map(norm), done: false };
  });

  const checkBtn = checkButton(wrap, () => {
    let right = 0;
    for (const r of rows) {
      if (r.done) {
        right += 1;
        continue;
      }
      const given = norm(r.input.value);
      r.row.classList.remove("exo-wm__item--wrong", "exo-wm__item--near");
      r.note.textContent = "";
      if (!given) continue;
      if (r.accepted.includes(given)) {
        r.done = true;
        r.input.disabled = true;
        r.row.classList.add("exo-wm__item--right");
        right += 1;
      } else if (r.accepted.some((a) => editDistance(given, a, 1) <= 1)) {
        r.row.classList.add("exo-wm__item--near");
        r.note.textContent = "Almost — check your spelling.";
      } else {
        r.row.classList.add("exo-wm__item--wrong");
      }
    }
    checkBtn.result(`${right} / ${rows.length} correct`);
  });

  return wrap;
}

/* ---------- Idea pick (problem solving) ------------------------- */

const IDEA_RATINGS = [
  { v: "up", icon: "👍", label: "works" },
  { v: "maybe", icon: "🤔", label: "maybe" },
  { v: "down", icon: "👎", label: "won't work" },
];

/** Reason chips: tap one and it is added to the sentence you are writing. */
const IDEA_REASONS = [
  { en: "it is fair to everybody", de: "fair für alle" },
  { en: "it solves the real problem", de: "löst das eigentliche Problem" },
  { en: "nobody is left out", de: "niemand wird ausgeschlossen" },
  { en: "it is quick and easy", de: "schnell und einfach" },
  { en: "it works for a long time", de: "wirkt lange" },
  { en: "we find out more first", de: "wir erfahren erst mehr" },
  { en: "it does not change anything", de: "ändert nichts" },
  { en: "it could make things worse", de: "könnte es schlimmer machen" },
];

/**
 * Problem solving, made interactive: read the problem, rate every idea
 * (👍 / 🤔 / 👎), tap ★ for the best one (and ✗ for the weakest when
 * the starters ask for it), then write why. Reason chips drop a phrase
 * into the sentence being written, and "Idea ___" in each starter fills
 * in with the chosen number. Everything is saved (and goes to the PDF).
 *
 * Keys (via keyFor): "rate-<i>", "best", "worst" and "s<k>" (starters).
 *
 * @param {{
 *   situation: string, ideas: string[], starters: string[], askWorst?: boolean,
 *   reasons?: Array<{en: string, de?: string}>,
 *   values: Record<string, string>, keyFor: (k: string) => string,
 *   onChange: (k: string, v: string) => void,
 * }} opts
 */
export function createIdeaPick({ situation, ideas, starters, askWorst, reasons, values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-idea";

  const state = {
    rate: ideas.map((_, i) => values[`rate-${i}`] ?? ""),
    best: values.best ?? "",
    worst: values.worst ?? "",
  };
  const set = (k, v) => {
    values[k] = v;
    onChange(k, v);
  };
  const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);

  // --- The problem ------------------------------------------------
  const problem = document.createElement("div");
  problem.className = "exo-idea__problem";
  const tag = document.createElement("span");
  tag.className = "exo-idea__tag";
  tag.textContent = "The problem";
  const sit = document.createElement("p");
  sit.textContent = situation;
  problem.append(tag, sit);
  wrap.appendChild(problem);

  const stepLine = (n, text) => {
    const p = document.createElement("p");
    p.className = "exo-idea__step";
    const b = document.createElement("span");
    b.className = "exo-idea__step-n";
    b.textContent = n;
    p.append(b, document.createTextNode(text));
    return p;
  };

  wrap.appendChild(
    stepLine("1", askWorst ? "Rate every idea — then tap ★ for the best and ✗ for the weakest." : "Rate every idea — then tap ★ for the best one."),
  );

  // --- Idea tiles -------------------------------------------------
  const grid = document.createElement("div");
  grid.className = "exo-idea__grid";
  const tiles = ideas.map((text, i) => {
    const tile = document.createElement("article");
    tile.className = "exo-idea__tile";

    const head = document.createElement("div");
    head.className = "exo-idea__head";
    const num = document.createElement("span");
    num.className = "exo-idea__num";
    num.textContent = `Idea ${i + 1}`;
    const stamp = document.createElement("span");
    stamp.className = "exo-idea__stamp";
    head.append(num, stamp);

    const p = document.createElement("p");
    p.className = "exo-idea__text";
    p.textContent = cap(text);

    const rate = document.createElement("div");
    rate.className = "exo-idea__rate";
    const rateBtns = IDEA_RATINGS.map((r) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `exo-idea__rate-btn exo-idea__rate-btn--${r.v}`;
      b.innerHTML = `<span aria-hidden="true">${r.icon}</span> ${r.label}`;
      b.addEventListener("click", () => {
        state.rate[i] = state.rate[i] === r.v ? "" : r.v;
        set(`rate-${i}`, state.rate[i]);
        paint();
      });
      rate.appendChild(b);
      return { b, v: r.v };
    });

    const pick = document.createElement("div");
    pick.className = "exo-idea__pick";
    const bestBtn = document.createElement("button");
    bestBtn.type = "button";
    bestBtn.className = "exo-idea__pick-btn exo-idea__pick-btn--best";
    bestBtn.textContent = "★ Best";
    bestBtn.addEventListener("click", () => {
      const v = String(i + 1);
      state.best = state.best === v ? "" : v;
      if (state.best && state.worst === v) {
        state.worst = "";
        set("worst", "");
      }
      set("best", state.best);
      paint();
    });
    pick.appendChild(bestBtn);
    let worstBtn = null;
    if (askWorst) {
      worstBtn = document.createElement("button");
      worstBtn.type = "button";
      worstBtn.className = "exo-idea__pick-btn exo-idea__pick-btn--worst";
      worstBtn.textContent = "✗ Weakest";
      worstBtn.addEventListener("click", () => {
        const v = String(i + 1);
        state.worst = state.worst === v ? "" : v;
        if (state.worst && state.best === v) {
          state.best = "";
          set("best", "");
        }
        set("worst", state.worst);
        paint();
      });
      pick.appendChild(worstBtn);
    }

    tile.append(head, p, rate, pick);
    grid.appendChild(tile);
    return { tile, stamp, rateBtns, bestBtn, worstBtn };
  });
  wrap.appendChild(grid);

  const nudge = document.createElement("p");
  nudge.className = "exo-idea__nudge";
  nudge.hidden = true;
  wrap.appendChild(nudge);

  // --- Why? reason chips + starters --------------------------------
  wrap.appendChild(stepLine("2", "Why? Tap a reason to add it to your sentence — then finish it in your own words."));

  const chips = document.createElement("div");
  chips.className = "exo-idea__chips";
  wrap.appendChild(chips);

  const list = document.createElement("div");
  list.className = "taskcard__starters exo-idea__starters";
  let lastInput = null;
  const rows = starters.map((starter, k) => {
    const row = document.createElement("div");
    row.className = "taskcard__starter";
    const label = document.createElement("span");
    label.className = "taskcard__starter-label";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "taskcard__starter-input";
    input.dataset.answerKey = keyFor(`s${k + 1}`);
    input.value = values[`s${k + 1}`] ?? "";
    // Remember the sentence being written, so a reason chip lands there
    for (const ev of ["focus", "pointerdown"]) input.addEventListener(ev, () => (lastInput = input));
    input.addEventListener("input", () => {
      lastInput = input;
      set(`s${k + 1}`, input.value);
    });
    row.append(label, input);
    list.appendChild(row);
    return { label, input, starter, k };
  });

  for (const reason of reasons ?? IDEA_REASONS) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "exo-idea__chip";
    chip.innerHTML = `<span class="exo-idea__chip-en"></span><span class="exo-idea__chip-de"></span>`;
    chip.querySelector(".exo-idea__chip-en").textContent = `+ ${reason.en}`;
    chip.querySelector(".exo-idea__chip-de").textContent = reason.de ?? "";
    // Keep the focus (and caret) in the sentence being written
    chip.addEventListener("pointerdown", (e) => e.preventDefault());
    chip.addEventListener("click", () => {
      const target = lastInput ?? rows.find((r) => !r.input.value.trim())?.input ?? rows[0]?.input;
      if (!target) return;
      const cur = target.value.replace(/\s+$/, "");
      target.value = cur ? `${cur}${/[,;]$/.test(cur) ? "" : ","} ${reason.en}` : reason.en;
      target.dispatchEvent(new Event("input"));
      target.focus();
      chip.classList.add("exo-idea__chip--used");
    });
    chips.appendChild(chip);
  }
  wrap.appendChild(list);

  function paint() {
    tiles.forEach((t, i) => {
      const v = String(i + 1);
      t.tile.classList.remove("exo-idea__tile--up", "exo-idea__tile--maybe", "exo-idea__tile--down");
      if (state.rate[i]) t.tile.classList.add(`exo-idea__tile--${state.rate[i]}`);
      t.rateBtns.forEach(({ b, v: rv }) => b.setAttribute("aria-pressed", String(state.rate[i] === rv)));
      const isBest = state.best === v;
      const isWorst = state.worst === v;
      t.tile.classList.toggle("exo-idea__tile--best", isBest);
      t.tile.classList.toggle("exo-idea__tile--worst", isWorst);
      t.bestBtn.setAttribute("aria-pressed", String(isBest));
      t.worstBtn?.setAttribute("aria-pressed", String(isWorst));
      t.stamp.textContent = isBest ? "★ best" : isWorst ? "✗ weakest" : "";
    });

    // Starters: "Idea ___" becomes the chosen number as soon as there is one
    for (const r of rows) {
      const pickFor = /worse|weak/i.test(r.starter) ? state.worst : /best/i.test(r.starter) ? state.best : "";
      r.label.textContent = pickFor ? r.starter.replace("___", pickFor) : r.starter;
    }

    // A gentle nudge when the choice contradicts the rating
    const bi = Number(state.best) - 1;
    const wi = Number(state.worst) - 1;
    let msg = "";
    if (state.best && state.rate[bi] === "down") msg = `You said Idea ${state.best} won't work — are you sure it is the best?`;
    else if (state.worst && state.rate[wi] === "up") msg = `You said Idea ${state.worst} works — are you sure it is the weakest?`;
    nudge.textContent = msg;
    nudge.hidden = !msg;
  }
  paint();

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

/* ================= Comic strip (storyboard) =====================
 * A creative mini-project: the learner turns a story into a 3–4 panel
 * comic. Each panel has an art slot (optional AI-generated frame the
 * user adds later — placeholder until then), a caption/narration box
 * and a speech-bubble line that appears live on the panel. Product
 * task; every text field feeds the PDF.
 * ============================================================ */

export function createComicStrip({ panels, base, values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-comic";
  const grid = document.createElement("div");
  grid.className = "exo-comic__grid";
  wrap.appendChild(grid);

  panels.forEach((panel, i) => {
    const cell = document.createElement("article");
    cell.className = "exo-comic__panel";

    const frame = document.createElement("div");
    frame.className = "exo-comic__frame";

    const bubble = document.createElement("div");
    bubble.className = "exo-comic__bubble";

    if (base && panel.img) {
      const img = document.createElement("img");
      img.className = "exo-comic__art";
      img.src = `${base}/${panel.img}`;
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("error", () => {
        img.remove();
        frame.classList.add("exo-comic__frame--empty");
      });
      frame.appendChild(img);
    } else {
      frame.classList.add("exo-comic__frame--empty");
    }

    const numBadge = document.createElement("span");
    numBadge.className = "exo-comic__num";
    numBadge.textContent = String(panel.n ?? i + 1);

    frame.append(numBadge, bubble);

    const prompt = document.createElement("p");
    prompt.className = "exo-comic__prompt";
    prompt.textContent = panel.prompt ?? "";

    const bubbleInput = document.createElement("input");
    bubbleInput.type = "text";
    bubbleInput.className = "exo-comic__bubble-input";
    bubbleInput.placeholder = panel.bubblePlaceholder ?? "💬 Speech bubble…";
    bubbleInput.value = values?.[`p${i}-bubble`] ?? "";
    bubbleInput.dataset.answerKey = keyFor(`p${i}-bubble`);

    const cap = document.createElement("textarea");
    cap.className = "exo-comic__cap";
    cap.rows = 2;
    cap.placeholder = panel.capPlaceholder ?? "Caption / narration…";
    cap.value = values?.[`p${i}-cap`] ?? "";
    cap.dataset.answerKey = keyFor(`p${i}-cap`);

    const paintBubble = () => {
      bubble.textContent = bubbleInput.value;
      bubble.classList.toggle("exo-comic__bubble--on", bubbleInput.value.trim().length > 0);
    };
    bubbleInput.addEventListener("input", () => {
      onChange(`p${i}-bubble`, bubbleInput.value);
      paintBubble();
    });
    cap.addEventListener("input", () => onChange(`p${i}-cap`, cap.value));
    paintBubble();

    cell.append(frame, prompt, bubbleInput, cap);
    grid.appendChild(cell);
  });

  return wrap;
}

/* ================= Bilingual mediation card =====================
 * A creative mediation project: for each hazard the learner writes the
 * warning in English and its explanation in German, side by side, and
 * it renders as a hand-made safety card. Product task; every field
 * feeds the PDF.
 * ============================================================ */

export function createBilingualCard({ rows, values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-bicard";

  const card = document.createElement("article");
  card.className = "exo-bicard__card";
  wrap.appendChild(card);

  const head = document.createElement("div");
  head.className = "exo-bicard__head";
  head.innerHTML =
    '<span class="exo-bicard__col-en">English — warning</span><span class="exo-bicard__col-de">Deutsch — Erklärung</span>';
  card.appendChild(head);

  rows.forEach((row, i) => {
    const rowEl = document.createElement("div");
    rowEl.className = "exo-bicard__row";

    const hazard = document.createElement("div");
    hazard.className = "exo-bicard__hazard";
    hazard.innerHTML = `<span class="exo-bicard__icon">${row.icon ?? "⚠️"}</span><span>${row.hazard}</span>`;

    const en = document.createElement("textarea");
    en.className = "exo-bicard__en";
    en.rows = 2;
    en.placeholder = row.en ?? "Stay away from …";
    en.value = values?.[`r${i}-en`] ?? "";
    en.dataset.answerKey = keyFor(`r${i}-en`);
    en.addEventListener("input", () => onChange(`r${i}-en`, en.value));

    const de = document.createElement("textarea");
    de.className = "exo-bicard__de";
    de.rows = 2;
    de.placeholder = row.de ?? "Halte dich fern von …";
    de.value = values?.[`r${i}-de`] ?? "";
    de.dataset.answerKey = keyFor(`r${i}-de`);
    de.addEventListener("input", () => onChange(`r${i}-de`, de.value));

    rowEl.append(hazard, en, de);
    card.appendChild(rowEl);
  });

  return wrap;
}

/* ================= Sign maker (camp rules) ======================
 * A creative grammar project: the learner writes a set of campsite
 * rules — each must use a modal — and every line renders live as a
 * notice-board sign. Optional AI-generated sign art per board (added
 * later). Product task; every field feeds the PDF.
 * ============================================================ */

export function createSignMaker({ signs, base, values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-signs";
  const gallery = document.createElement("div");
  gallery.className = "exo-signs__gallery";
  wrap.appendChild(gallery);

  signs.forEach((sign, i) => {
    const cell = document.createElement("div");
    cell.className = "exo-signs__cell";

    const board = document.createElement("div");
    board.className = "exo-signs__board";
    if (base && sign.img) {
      board.style.backgroundImage = `url("${base}/${sign.img}")`;
      board.classList.add("exo-signs__board--art");
    }
    const boardText = document.createElement("span");
    boardText.className = "exo-signs__board-text";
    board.appendChild(boardText);

    const hint = document.createElement("label");
    hint.className = "exo-signs__hint";
    hint.textContent = sign.hint ?? `Rule ${i + 1}`;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "exo-signs__input";
    input.placeholder = sign.placeholder ?? "You must …";
    input.value = values?.[`s${i}`] ?? "";
    input.dataset.answerKey = keyFor(`s${i}`);

    const paint = () => {
      boardText.textContent = input.value || sign.placeholder || "You must …";
      boardText.classList.toggle("exo-signs__board-text--ghost", !input.value);
    };
    input.addEventListener("input", () => {
      onChange(`s${i}`, input.value);
      paint();
    });
    paint();

    hint.appendChild(input);
    cell.append(board, hint);
    gallery.appendChild(cell);
  });

  return wrap;
}

/* ================= Bilingual awareness poster ===================
 * A mediation mini-project: the learner turns one danger (sun & heat)
 * into a public-information poster written in BOTH languages. Every line
 * has an English version and a German one, and the whole thing renders
 * live as a real awareness poster. Product task; every field feeds the
 * PDF. Field keys: head-en/head-de, tip{i}-en/tip{i}-de, foot-en/foot-de.
 * ============================================================ */

export function createBilingualPoster({
  icon = "☀️",
  headline = {},
  tips = [],
  footer = {},
  values,
  keyFor,
  onChange,
}) {
  const state = {};
  const get = (k) => values?.[k] ?? "";

  const wrap = document.createElement("div");
  wrap.className = "exo exo-biposter";
  const grid = document.createElement("div");
  grid.className = "exo-biposter__grid";
  wrap.appendChild(grid);

  // LEFT: live poster preview
  const left = document.createElement("div");
  left.className = "exo-biposter__left";
  const cap = document.createElement("div");
  cap.className = "exo-biposter__cap";
  cap.textContent = "Live poster";
  const poster = document.createElement("article");
  poster.className = "exo-biposter__poster";

  const sun = document.createElement("div");
  sun.className = "exo-biposter__sun";
  sun.textContent = icon;

  const headEn = document.createElement("h4");
  headEn.className = "exo-biposter__head-en";
  const headDe = document.createElement("p");
  headDe.className = "exo-biposter__head-de";

  const list = document.createElement("ul");
  list.className = "exo-biposter__tips";
  const tipEls = tips.map(() => {
    const li = document.createElement("li");
    li.className = "exo-biposter__tip";
    const en = document.createElement("span");
    en.className = "exo-biposter__tip-en";
    const de = document.createElement("span");
    de.className = "exo-biposter__tip-de";
    li.append(en, de);
    list.appendChild(li);
    return { en, de };
  });

  const foot = document.createElement("div");
  foot.className = "exo-biposter__foot";
  const footEn = document.createElement("span");
  footEn.className = "exo-biposter__foot-en";
  const footDe = document.createElement("span");
  footDe.className = "exo-biposter__foot-de";
  foot.append(footEn, footDe);

  poster.append(sun, headEn, headDe, list, foot);
  left.append(cap, poster);

  // RIGHT: form
  const right = document.createElement("div");
  right.className = "exo-biposter__right";
  const form = document.createElement("div");
  form.className = "exo-biposter__form";
  right.appendChild(form);

  const addField = (key, langLabel, placeholder) => {
    const label = document.createElement("label");
    label.className = "exo-biposter__field";
    const span = document.createElement("span");
    span.className = "exo-biposter__flabel";
    span.textContent = langLabel;
    const el = document.createElement("input");
    el.type = "text";
    el.className = `exo-biposter__input exo-biposter__input--${key.endsWith("-de") ? "de" : "en"}`;
    el.placeholder = placeholder ?? "";
    el.value = get(key);
    el.dataset.answerKey = keyFor(key);
    state[key] = el.value;
    el.addEventListener("input", () => {
      state[key] = el.value;
      onChange(key, el.value);
      update();
    });
    label.append(span, el);
    return label;
  };

  const addRow = (title, enField, deField, enPh, dePh) => {
    const row = document.createElement("div");
    row.className = "exo-biposter__inrow";
    const rl = document.createElement("div");
    rl.className = "exo-biposter__rowlabel";
    rl.textContent = title;
    row.append(rl, addField(enField, "English", enPh), addField(deField, "Deutsch", dePh));
    form.appendChild(row);
  };

  addRow("Headline", "head-en", "head-de", headline.en, headline.de);
  tips.forEach((t, i) => addRow(`Tip ${i + 1}`, `tip${i}-en`, `tip${i}-de`, t.en, t.de));
  addRow("In an emergency", "foot-en", "foot-de", footer.en, footer.de);

  grid.append(left, right);

  const paint = (el, val, ph) => {
    el.textContent = val || ph || "";
    el.classList.toggle("exo-biposter__ghost", !val);
  };
  function update() {
    paint(headEn, state["head-en"], headline.en);
    paint(headDe, state["head-de"], headline.de);
    tips.forEach((t, i) => {
      paint(tipEls[i].en, state[`tip${i}-en`], t.en);
      paint(tipEls[i].de, state[`tip${i}-de`], t.de);
    });
    paint(footEn, state["foot-en"], footer.en);
    paint(footDe, state["foot-de"], footer.de);
  }
  update();

  return wrap;
}

/* ================= Comic speech bubbles =========================
 * A creative reading mini-project: the learner reads a wordless six-panel
 * comic (hand-painted RFDS rescue) and writes the dialogue. Each panel has
 * one or two blank speech bubbles already drawn into the artwork; the
 * learner types in a text field below the panel and the words appear live
 * inside the matching bubble. Product task; every field feeds the PDF.
 * Bubble coords (x, y = centre; w, h = size) are percentages of the panel.
 * Field keys: p{i}-b{j}.
 * ============================================================ */

const COMIC_WORD_MAX = 10;
const comicWords = (s) => s.trim().split(/\s+/).filter(Boolean);

export function createComicSpeech({ panels, base, values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-comicx";
  const grid = document.createElement("div");
  grid.className = "exo-comicx__grid";
  wrap.appendChild(grid);

  panels.forEach((panel, i) => {
    const cell = document.createElement("article");
    cell.className = "exo-comicx__cell";

    const frame = document.createElement("div");
    frame.className = "exo-comicx__frame";
    if (base && panel.img) {
      const img = document.createElement("img");
      img.className = "exo-comicx__art";
      img.src = `${base}/${panel.img}`;
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("error", () => {
        img.remove();
        frame.classList.add("exo-comicx__frame--empty");
      });
      frame.appendChild(img);
    } else {
      frame.classList.add("exo-comicx__frame--empty");
    }

    const inputs = document.createElement("div");
    inputs.className = "exo-comicx__inputs";

    const frameFits = []; // re-fit every bubble's text when the panel resizes

    (panel.bubbles ?? []).forEach((b, j) => {
      const key = `p${i}-b${j}`;

      // Overlay that sits on the drawn bubble in the artwork (no visible
      // marker of its own — it's just where the learner's words appear).
      const ov = document.createElement("div");
      ov.className = "exo-comicx__bubble";
      ov.style.left = `${b.x}%`;
      ov.style.top = `${b.y}%`;
      ov.style.width = `${b.w}%`;
      ov.style.height = `${b.h}%`;
      const txt = document.createElement("span");
      txt.className = "exo-comicx__bubble-text";
      ov.appendChild(txt);
      frame.appendChild(ov);

      // Shrink the words until they fit inside the bubble box (both ways).
      const fit = () => {
        if (!ov.clientHeight || !txt.textContent) return;
        let size = 16;
        txt.style.fontSize = size + "px";
        while (
          (txt.scrollHeight > ov.clientHeight || txt.scrollWidth > ov.clientWidth) &&
          size > 6
        ) {
          size -= 0.5;
          txt.style.fontSize = size + "px";
        }
      };
      frameFits.push(fit);

      // Text field below the panel — one clearly-labelled row per bubble.
      const field = document.createElement("div");
      field.className = "exo-comicx__field";

      const head = document.createElement("div");
      head.className = "exo-comicx__fhead";
      const numTag = document.createElement("span");
      numTag.className = "exo-comicx__badge2";
      numTag.textContent = String(j + 1);
      const label = document.createElement("label");
      label.className = "exo-comicx__flabel";
      label.textContent = b.speaker ? `${b.speaker} says` : `Speech bubble ${j + 1}`;
      const count = document.createElement("span");
      count.className = "exo-comicx__count";
      head.append(numTag, label, count);

      const input = document.createElement("input");
      input.type = "text";
      input.className = "exo-comicx__input";
      input.maxLength = 90;
      input.value = values?.[key] ?? "";
      input.dataset.answerKey = keyFor(key);
      label.setAttribute("for", input.id = `${keyFor(key)}-in`);

      const setCount = () => {
        const n = comicWords(input.value).length;
        count.textContent = `${n} / ${COMIC_WORD_MAX} words`;
        count.classList.toggle("exo-comicx__count--full", n >= COMIC_WORD_MAX);
      };
      const paint = () => {
        txt.textContent = input.value;
        ov.classList.toggle("exo-comicx__bubble--on", input.value.trim().length > 0);
        fit();
      };
      input.addEventListener("input", () => {
        // Hard limit: never allow more than COMIC_WORD_MAX words.
        const w = comicWords(input.value);
        if (w.length > COMIC_WORD_MAX) {
          input.value = w.slice(0, COMIC_WORD_MAX).join(" ");
        }
        setCount();
        onChange(key, input.value);
        paint();
      });
      setCount();
      paint();

      field.append(head, input);
      inputs.appendChild(field);
    });

    // The panel's real size only settles once the artwork has loaded and on
    // every responsive resize — re-fit the bubble text each time.
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(() => frameFits.forEach((f) => f())).observe(frame);
    }

    cell.append(frame, inputs);
    grid.appendChild(cell);
  });

  return wrap;
}

/* ================= Poster fill-in (mediation) ===================
 * TWO identical blank posters side by side: the learner fills the whole
 * left poster in one language and the whole right poster in the other
 * (mediation). Each poster shares the same empty zones drawn into the art
 * (a headline, one caption under each icon and a message banner). The
 * words fill the poster live. Product task; every zone feeds the PDF, and
 * the PDF also embeds a small rendered copy of both finished posters.
 * Zone coords (x, y = top-left; w, h = size) are % of the poster image.
 * Field keys: p{posterIndex}-z{zoneIndex}.
 * ============================================================ */

export function createPosterFill({ base, img, posters, zones, values, keyFor, onChange }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-pfill";
  const grid = document.createElement("div");
  grid.className = "exo-pfill__grid";
  wrap.appendChild(grid);

  const list = posters ?? [{ lang: "en" }];

  list.forEach((poster, pi) => {
    const col = document.createElement("div");
    col.className = `exo-pfill__col exo-pfill__col--${poster.lang === "de" ? "de" : "en"}`;

    const head = document.createElement("div");
    head.className = "exo-pfill__lang";
    head.textContent = poster.label || (poster.lang === "de" ? "Deutsch" : "English");
    col.appendChild(head);

    const stage = document.createElement("div");
    stage.className = "exo-pfill__stage";
    col.appendChild(stage);

    if (base && img) {
      const im = document.createElement("img");
      im.className = "exo-pfill__bg";
      im.src = `${base}/${img}`;
      im.alt = "";
      stage.appendChild(im);
    }

    const zoneFits = [];

    (zones ?? []).forEach((z, zi) => {
      const key = `p${pi}-z${zi}`;
      const zone = document.createElement("div");
      zone.className = "exo-pfill__zone";
      if (z.role) zone.classList.add(`exo-pfill__zone--${z.role}`);
      zone.style.left = `${z.x}%`;
      zone.style.top = `${z.y}%`;
      zone.style.width = `${z.w}%`;
      zone.style.height = `${z.h}%`;

      const ta = document.createElement("textarea");
      ta.className = "exo-pfill__ta";
      ta.value = values?.[key] ?? "";
      ta.dataset.answerKey = keyFor(key);
      ta.setAttribute("aria-label", `${head.textContent} — ${z.pdf || z.role || "text"}`);
      ta.spellcheck = false;

      // Shrink the text until it fits the zone (no scrollbars on a poster).
      const fit = () => {
        ta.style.fontSize = "";
        if (!ta.clientHeight) return;
        let size = parseFloat(getComputedStyle(ta).fontSize) || 16;
        ta.style.fontSize = `${size}px`;
        let guard = 0;
        while (ta.scrollHeight > ta.clientHeight && size > 7 && guard < 60) {
          size -= 1;
          ta.style.fontSize = `${size}px`;
          guard += 1;
        }
      };

      const paint = () => {
        zone.classList.toggle("exo-pfill__zone--filled", ta.value.trim().length > 0);
        fit();
      };
      ta.addEventListener("input", () => {
        onChange(key, ta.value);
        paint();
      });
      paint();

      zone.appendChild(ta);
      stage.appendChild(zone);
      zoneFits.push(fit);
    });

    // Zones only get their real size once the poster image has loaded and on
    // every responsive resize — re-fit each zone's text then.
    if (typeof ResizeObserver === "function") {
      new ResizeObserver(() => zoneFits.forEach((f) => f())).observe(stage);
    }

    grid.appendChild(col);
  });

  return wrap;
}

/**
 * School-reporter workspace — a guided five-part newspaper report.
 *
 * Header (task title, directions EN + DE, progress dots, "Your report"),
 * a model clipping, one numbered row per part with a character counter,
 * sentence starters on demand (tap one to put it into the active row),
 * and a side panel with German vocabulary help and a tip. "Your report"
 * opens a live newspaper page built from the learner's own answers.
 *
 * @param {{
 *   taskNo: number, kind?: string, title: string, intro: string, introDe?: string,
 *   example?: {title: string, text: string, note?: string},
 *   parts: Array<{q: string, starter?: string, hint?: string, placeholder?: string, max?: number, starters?: string[]}>,
 *   vocab?: Array<[string, string]>, tip?: string, tipDe?: string,
 *   image?: string, values?: Record<string,string>,
 *   theme?: "radio", motto?: string[], corner?: {icon?: "pencil"|"radio", lines: string[]},
 *   partsTitle?: string, preview?: "newspaper"|"radio", showName?: string,
 *   keyFor: (k: number) => string, onChange: (k: number, v: string) => void,
 * }} opts
 *
 * The "radio" theme (Listening challenge) swaps the newspaper look for an
 * on-air one: brush-stroke task tag, round photo, "Your spot" opens a
 * radio script with a length check and a read-aloud button.
 */
export function createReportBuilder({
  taskNo, kind, title, intro, introDe, example, parts, vocab = [], tip, tipDe, image,
  theme, motto = ["Real stories.", "Real voices.", "Your report."],
  corner = { icon: "pencil", lines: ["Small moments.", "Big stories."] },
  partsTitle, preview = "newspaper", showName = "Fairfield Live",
  values = {}, keyFor, onChange,
}) {
  const isRadio = preview === "radio";
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const wrap = el("div", "exo exo-rep");
  if (theme) wrap.classList.add(`exo-rep--${theme}`);

  // ----- Header -----
  const head = el("header", "exo-rep__head");
  const headText = el("div", "exo-rep__head-text");
  if (kind) headText.appendChild(el("p", "exo-rep__kind", kind));
  const h = el("h3", "exo-rep__title");
  h.append(el("span", "exo-rep__task", `Task ${taskNo}`), document.createTextNode(title));
  headText.appendChild(h);
  const introBox = el("div", "exo-rep__intro");
  introBox.appendChild(el("p", "exo-rep__intro-en", intro));
  if (introDe) introBox.appendChild(el("p", "exo-rep__intro-de", introDe));
  headText.appendChild(introBox);

  const art = el("div", "exo-rep__head-art");
  if (image) {
    const img = el("img", "exo-rep__desk");
    img.src = image;
    img.alt = "";
    img.loading = "lazy";
    art.appendChild(img);
  }
  const mottoEl = el("p", "exo-rep__motto");
  motto.forEach((t) => mottoEl.appendChild(el("span", "", t)));
  art.appendChild(mottoEl);

  const bar = el("div", "exo-rep__bar");
  const dots = el("div", "exo-rep__dots");
  const dotEls = parts.map((_, k) => {
    const d = el("button", "exo-rep__dot", String(k + 1));
    d.type = "button";
    d.setAttribute("aria-label", `Part ${k + 1}`);
    d.addEventListener("click", () => rows[k].field.focus());
    dots.appendChild(d);
    return d;
  });
  const showBtn = el("button", "exo-rep__show");
  showBtn.type = "button";
  showBtn.innerHTML =
    '<span></span><span class="exo-rep__show-icon" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 4h11l3 3v13H5z M8 4v5h7V4 M8 20v-6h8v6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></span>';
  showBtn.firstChild.textContent = isRadio ? "Your spot" : "Your report";
  bar.append(dots, showBtn);

  head.append(headText, art, bar);
  wrap.appendChild(head);

  // ----- Body grid: main column + help panel -----
  const grid = el("div", "exo-rep__grid");
  const main = el("div", "exo-rep__main");
  const aside = el("aside", "exo-rep__aside");
  grid.append(main, aside);
  wrap.appendChild(grid);

  if (example) {
    const ex = el("figure", "exo-rep__example");
    ex.appendChild(el("figcaption", "exo-rep__example-tag", "Example · Beispiel"));
    ex.appendChild(el("p", "exo-rep__example-title", example.title));
    ex.appendChild(el("p", "exo-rep__example-text", example.text));
    const note = el("p", "exo-rep__example-note");
    note.innerHTML =
      '<svg viewBox="0 0 120 40" width="96" height="32" aria-hidden="true"><path d="M116 8 C 90 34, 40 38, 8 22 M8 22 l12 -8 M8 22 l14 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    note.appendChild(el("span", "", example.note ?? "This is an example report."));
    ex.appendChild(note);
    main.appendChild(ex);
  }

  // ----- The five parts -----
  let active = 0;
  if (partsTitle) {
    const pt = el("div", "exo-rep__parts-title");
    const ic = el("span", "exo-rep__parts-icon");
    ic.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
    pt.append(ic, el("span", "", partsTitle));
    main.appendChild(pt);
  }
  const list = el("ol", "exo-rep__parts");
  const rows = parts.map((p, k) => {
    const li = el("li", "exo-rep__part");
    const num = el("span", "exo-rep__num", String(k + 1));
    const label = el("div", "exo-rep__label");
    label.appendChild(el("strong", "", p.q));
    if (p.starter) label.appendChild(el("span", "exo-rep__starter", p.starter));
    if (p.hint) label.appendChild(el("span", "exo-rep__hint", p.hint));
    const box = el("div", "exo-rep__box");
    const field = el("textarea", "exo-rep__field");
    field.rows = k === 0 ? 1 : 2;
    field.maxLength = p.max ?? 120;
    field.placeholder = p.placeholder ?? "Write your sentence here…";
    field.dataset.answerKey = keyFor(k);
    field.value = values[keyFor(k)] ?? "";
    const count = el("span", "exo-rep__count");
    box.append(field, count);
    li.append(num, label, box);
    list.appendChild(li);

    // focus alone is not reliable on every device — a tap or typing
    // also makes this row the active one (where starters go)
    field.addEventListener("focus", () => setActive(k));
    field.addEventListener("pointerdown", () => setActive(k));
    field.addEventListener("input", () => {
      onChange(k, field.value);
      if (active !== k) setActive(k);
      else paint();
    });
    return { li, field, count, max: field.maxLength };
  });
  main.appendChild(list);

  // ----- Sentence starters on demand -----
  const helpBar = el("div", "exo-rep__helpbar");
  helpBar.appendChild(el("span", "exo-rep__need", "Need some help?"));
  const startBtn = el("button", "exo-rep__starters-btn");
  startBtn.type = "button";
  startBtn.setAttribute("aria-expanded", "false");
  const startLabel = el("span", "", "Show sentence starters");
  startBtn.append(el("span", "", "💡"), startLabel, el("span", "exo-rep__chev", "▾"));
  helpBar.appendChild(startBtn);
  const startPanel = el("div", "exo-rep__starters");
  startPanel.hidden = true;
  main.append(helpBar, startPanel);

  const fillStarters = () => {
    startPanel.replaceChildren();
    startPanel.appendChild(el("p", "exo-rep__starters-for", `Part ${active + 1} · ${parts[active].q} — tap one to use it:`));
    const chips = el("div", "exo-rep__chips");
    (parts[active].starters ?? []).forEach((s) => {
      const c = el("button", "exo-rep__chip", s);
      c.type = "button";
      // keep the row's focus: the chip goes into the active field
      c.addEventListener("pointerdown", (e) => e.preventDefault());
      c.addEventListener("click", () => {
        const r = rows[active];
        const text = s.replace(/…$/, "").trimEnd();
        r.field.value = (r.field.value.trim() ? `${r.field.value.trimEnd()} ${text} ` : `${text} `).slice(0, r.max);
        onChange(active, r.field.value);
        paint();
        r.field.focus();
        r.field.setSelectionRange(r.field.value.length, r.field.value.length);
      });
      chips.appendChild(c);
    });
    startPanel.appendChild(chips);
  };
  startBtn.addEventListener("click", () => {
    startPanel.hidden = !startPanel.hidden;
    startBtn.setAttribute("aria-expanded", String(!startPanel.hidden));
    startBtn.classList.toggle("exo-rep__starters-btn--open", !startPanel.hidden);
    startLabel.textContent = startPanel.hidden ? "Show sentence starters" : "Hide sentence starters";
    if (!startPanel.hidden) fillStarters();
  });

  // ----- Help panel -----
  if (vocab.length) {
    const v = el("section", "exo-rep__vocab");
    const vh = el("h4", "exo-rep__aside-title");
    vh.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 5.5C5.5 4.5 9 4.5 12 6.5c3-2 6.5-2 9-1V19c-2.5-1-6-1-9 1-3-2-6.5-2-9-1z M12 6.5V20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>';
    vh.appendChild(el("span", "", "Vocabulary help"));
    v.appendChild(vh);
    const dl = el("dl", "exo-rep__vocab-list");
    vocab.forEach(([en, de]) => dl.append(el("dt", "", en), el("dd", "", de)));
    v.appendChild(dl);
    aside.appendChild(v);
  }
  if (tip) {
    const t = el("section", "exo-rep__tip");
    const th = el("h4", "exo-rep__tip-title");
    th.append(el("span", "exo-rep__bulb", "💡"), el("span", "", "Quick tip"));
    t.append(th, el("p", "", tip));
    if (tipDe) t.appendChild(el("p", "exo-rep__tip-de", tipDe));
    aside.appendChild(t);
  }
  const pencil = el("div", "exo-rep__pencil");
  pencil.innerHTML =
    corner.icon === "radio"
      ? '<svg viewBox="0 0 72 64" width="60" height="54" aria-hidden="true"><rect x="6" y="20" width="52" height="38" rx="6" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="21" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M36 33h15M36 40h15M36 47h15M14 20L40 6M60 14l7-5M62 22h8M60 30l7 4" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>'
      : '<svg viewBox="0 0 64 96" width="46" height="70" aria-hidden="true"><path d="M44 6l12 8-30 66-14 10 2-17z M38 18l12 8 M18 73l9 6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/></svg>';
  const pm = el("p", "exo-rep__pencil-motto");
  corner.lines.forEach((t) => pm.appendChild(el("span", "", t)));
  pencil.appendChild(pm);
  aside.appendChild(pencil);

  // ----- "Your report": the learner's own newspaper page -----
  const paper = el("section", "exo-rep__paper");
  paper.hidden = true;
  wrap.appendChild(paper);
  // Radio: the learner's script, a length check (~2.5 words a second) and
  // a button that reads the spot aloud like a presenter.
  const renderScript = () => {
    paper.replaceChildren();
    const mast = el("div", "exo-rep__script-mast");
    mast.append(el("span", "exo-rep__script-dot"), el("span", "", `On air · ${showName}`));
    paper.appendChild(mast);
    const vals = rows.map((r) => r.field.value.trim());
    const ol = el("ol", "exo-rep__script");
    parts.forEach((p, k) => {
      const li = el("li", vals[k] ? "" : "exo-rep__script-empty");
      li.append(el("span", "exo-rep__script-label", p.q), el("span", "", vals[k] || "…"));
      ol.appendChild(li);
    });
    paper.appendChild(ol);
    const text = vals.filter(Boolean).join(" ");
    const words = text ? text.split(/\s+/).length : 0;
    const secs = Math.round(words / 2.5);
    const foot = el("div", "exo-rep__script-foot");
    const len = el(
      "p",
      "exo-rep__paper-status",
      !words
        ? "Write your parts — then hear your spot."
        : secs < 20
          ? `About ${secs} seconds — a little short. Aim for about 30 seconds.`
          : secs > 40
            ? `About ${secs} seconds — a bit long. Aim for about 30 seconds.`
            : `About ${secs} seconds — perfect radio length!`,
    );
    foot.appendChild(len);
    if (words && window.speechSynthesis) {
      const play = el("button", "exo-rep__script-play", "▶ Hear your spot");
      play.type = "button";
      play.addEventListener("click", () => {
        try {
          speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(text);
          u.lang = "en-GB";
          u.rate = 0.95;
          speechSynthesis.speak(u);
        } catch {
          /* no speech here — the script still shows */
        }
      });
      foot.appendChild(play);
    }
    paper.appendChild(foot);
  };

  const renderPaper = () => {
    if (isRadio) return renderScript();
    paper.replaceChildren();
    const mast = el("div", "exo-rep__mast");
    mast.append(
      el("span", "exo-rep__mast-name", "The School Reporter"),
      el("span", "exo-rep__mast-date", new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })),
    );
    paper.appendChild(mast);
    const vals = rows.map((r) => r.field.value.trim());
    paper.appendChild(el("h4", "exo-rep__paper-head", vals[0] || "Your headline"));
    const name = /** @type {HTMLInputElement|null} */ (document.querySelector(".journal__nametag-input"))?.value.trim();
    if (name) paper.appendChild(el("p", "exo-rep__paper-by", `by ${name}`));
    const bodyText = vals.slice(1).filter(Boolean).join(" ");
    paper.appendChild(
      el("p", bodyText ? "exo-rep__paper-body" : "exo-rep__paper-body exo-rep__paper-body--empty",
        bodyText || "Fill in parts 2–5 — your report appears here."),
    );
    const done = vals.filter(Boolean).length;
    paper.appendChild(
      el("p", "exo-rep__paper-status",
        done === parts.length ? "✔ All five parts done — great report!" : `${done} of ${parts.length} parts done`),
    );
  };
  showBtn.addEventListener("click", () => {
    paper.hidden = !paper.hidden;
    showBtn.classList.toggle("exo-rep__show--on", !paper.hidden);
    if (!paper.hidden) {
      renderPaper();
      paper.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });

  // ----- State painting -----
  function setActive(k) {
    active = k;
    paint();
    if (!startPanel.hidden) fillStarters();
  }
  function paint() {
    rows.forEach((r, k) => {
      const filled = r.field.value.trim().length > 0;
      r.li.classList.toggle("exo-rep__part--active", k === active);
      r.li.classList.toggle("exo-rep__part--done", filled);
      r.count.textContent = `${r.field.value.length}/${r.max}`;
      r.count.classList.toggle("exo-rep__count--near", r.field.value.length > r.max * 0.85);
      dotEls[k].classList.toggle("exo-rep__dot--done", filled);
      dotEls[k].classList.toggle("exo-rep__dot--active", k === active);
    });
    if (!paper.hidden) renderPaper();
  }
  paint();

  return wrap;
}

/**
 * "Before you listen" for LE learners — a picture-led warm-up instead of
 * a text: who is talking (picture + two speaker cards), the topic in one
 * line (EN + DE), word cards that turn over to German and say the word
 * aloud, the numbers to listen for (tap to hear them), and a three-step
 * listening plan with German help.
 *
 * @param {{
 *   picture?: string, show: string, showDe?: string,
 *   speakers: Array<{icon: string, name: string, role: string, roleDe?: string}>,
 *   topic: string, topicDe?: string,
 *   words: Array<{icon: string, en: string, de: string}>,
 *   numbers?: Array<{n: string, say: string, de?: string}>,
 *   plan: Array<{icon: string, en: string, de?: string}>,
 * }} opts
 */
export function createListenPrep({ picture, pictureAlt, show, showDe, speakers = [], topic, topicDe, words = [], numbers = [], plan = [], labels = {} }) {
  // headings can be renamed, so the same warm-up also prepares Speaking
  const L = {
    who: ["Who is talking?", "Wer spricht?"],
    words: ["Words you will hear", "Tippe auf eine Karte: Du hörst das Wort und siehst es auf Deutsch."],
    numbers: ["Listen for these numbers!", "Diese Zahlen kommen vor. Tippe — du hörst, wie man sie sagt."],
    plan: ["Your listening plan", "So hörst du"],
    ...labels,
  };
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const say = (text) => {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      u.rate = 0.85;
      synth.speak(u);
    } catch {
      /* no speech on this device — the cards still work */
    }
  };
  // A plain heading per part — no numbers, so the card stays light
  const section = (en, de) => {
    const s = el("section", "exo-lprep__sec");
    if (!en && !de) return s; // no heading at all — the card title says it
    const h = el("h4", "exo-lprep__h");
    if (en) h.append(el("span", "", en));
    if (de) h.appendChild(el("span", "exo-lprep__h-de", de));
    s.appendChild(h);
    return s;
  };

  const wrap = el("div", "exo exo-lprep");

  // Who is talking? (picture, speakers, topic — each part optional)
  const who = section(...L.who);
  const stage = el("div", "exo-lprep__stage");
  const left = el("div", "exo-lprep__left");
  stage.appendChild(left);
  if (picture) {
    const fig = el("figure", "exo-lprep__pic");
    const img = el("img");
    img.src = picture;
    img.alt = pictureAlt ?? "A school radio studio with a microphone";
    img.loading = "lazy";
    fig.appendChild(img);
    const onAir = el("figcaption", "exo-lprep__onair");
    onAir.append(el("span", "exo-lprep__onair-dot"), el("span", "", show));
    fig.appendChild(onAir);
    left.appendChild(fig);
  }
  const side = el("div", "exo-lprep__who");
  if (showDe) side.appendChild(el("p", "exo-lprep__show-de", showDe));
  speakers.forEach((sp) => {
    const c = el("div", "exo-lprep__speaker");
    c.appendChild(el("span", "exo-lprep__avatar", sp.icon));
    const t = el("div");
    t.append(el("strong", "", sp.name), el("span", "exo-lprep__role", sp.role));
    if (sp.roleDe) t.appendChild(el("span", "exo-lprep__de", sp.roleDe));
    c.appendChild(t);
    side.appendChild(c);
  });
  const topicBox = el("div", "exo-lprep__topic");
  topicBox.appendChild(el("span", "exo-lprep__topic-tag", "Topic"));
  topicBox.appendChild(el("p", "exo-lprep__topic-en", topic));
  if (topicDe) topicBox.appendChild(el("p", "exo-lprep__de", topicDe));
  if (topic) left.appendChild(topicBox);
  if (speakers.length || showDe) stage.appendChild(side);
  else stage.classList.add("exo-lprep__stage--solo");
  who.appendChild(stage);
  if (picture || speakers.length || topic) wrap.appendChild(who);

  // Words — tap to turn over
  const ws = section(...L.words);
  const grid = el("div", "exo-lprep__words");
  const turned = new Set();
  const counter = el("p", "exo-lprep__count");
  const paintCount = () => {
    counter.textContent = turned.size === words.length
      ? `✔ All ${words.length} words — you are ready!`
      : `${turned.size} / ${words.length} cards turned`;
    counter.classList.toggle("exo-lprep__count--done", turned.size === words.length);
  };
  words.forEach((w, i) => {
    const card = el("button", "exo-lprep__word");
    card.type = "button";
    card.setAttribute("aria-label", `${w.en} — ${w.de}`);
    const inner = el("span", "exo-lprep__word-inner");
    const front = el("span", "exo-lprep__face exo-lprep__face--front");
    front.append(el("span", "exo-lprep__icon", w.icon), el("span", "exo-lprep__en", w.en));
    const back = el("span", "exo-lprep__face exo-lprep__face--back");
    back.append(el("span", "exo-lprep__icon", w.icon), el("span", "exo-lprep__de-word", w.de), el("span", "exo-lprep__en-small", w.en));
    inner.append(front, back);
    card.appendChild(inner);
    card.addEventListener("click", () => {
      card.classList.toggle("exo-lprep__word--turned");
      say(w.en);
      turned.add(i);
      paintCount();
    });
    grid.appendChild(card);
  });
  ws.append(grid, counter);
  paintCount();
  if (words.length) wrap.appendChild(ws);

  // Listen for these numbers
  if (numbers.length) {
    const ns = section(...L.numbers);
    const row = el("div", "exo-lprep__numbers");
    numbers.forEach((nb) => {
      const b = el("button", "exo-lprep__num");
      b.type = "button";
      b.append(el("span", "exo-lprep__num-n", nb.n), el("span", "exo-lprep__num-say", nb.say));
      if (nb.de) b.appendChild(el("span", "exo-lprep__num-de", nb.de));
      b.addEventListener("click", () => {
        say(nb.say);
        b.classList.add("exo-lprep__num--heard");
      });
      row.appendChild(b);
    });
    ns.appendChild(row);
    wrap.appendChild(ns);
  }

  // The plan (listening plan / way through the week)
  const ps = section(...L.plan);
  const steps = el("ol", `exo-lprep__plan${plan.length === 4 ? " exo-lprep__plan--four" : ""}`);
  plan.forEach((p) => {
    const li = el("li", "exo-lprep__step");
    li.append(el("span", "exo-lprep__step-icon", p.icon));
    const t = el("div");
    t.append(el("strong", "", p.en));
    if (p.de) t.appendChild(el("span", "exo-lprep__de", p.de));
    li.appendChild(t);
    steps.appendChild(li);
  });
  ps.appendChild(steps);
  if (plan.length) wrap.appendChild(ps);

  return wrap;
}

/**
 * Mediation challenge as a three-stage flow: (1) remember the dialogue —
 * tick off the key facts, optionally listen again; (2) explain it to a
 * German friend — one short German answer per fact; (3) ask Daniel one
 * question in English. A "Before you finish" bar checks the work live.
 *
 * @param {{
 *   kind?: string, title: string, underline?: string, intro: string, introDe?: string,
 *   badge?: string, motto?: string, audio?: {src: string, label?: string},
 *   remember: {title: string, text: string, facts: string[]},
 *   explain: {title: string, text: string, items: Array<{q: string, hint?: string, placeholder?: string}>},
 *   ask: {title: string, text: string, placeholder?: string, motto?: string},
 *   values?: Record<string,string>,
 *   keyFor: (f: string) => string, onChange: (f: string, v: string) => void,
 * }} opts
 */
export function createMediationFlow({
  kind, title, underline, intro, introDe, badge, motto, audio, remember, explain, ask,
  values = {}, keyFor, onChange,
}) {
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const svg = (paths, size = 30) =>
    `<svg viewBox="0 0 32 32" width="${size}" height="${size}" aria-hidden="true">${paths}</svg>`;
  const ICON = {
    head: svg('<path d="M6 19v-3a10 10 0 0 1 20 0v3" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="5" y="18" width="5" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="22" y="18" width="5" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/>'),
    trans: svg('<text x="3" y="17" font-size="14" font-family="sans-serif" fill="currentColor">文</text><text x="15" y="28" font-size="15" font-weight="700" font-family="sans-serif" fill="currentColor">A</text>'),
    mail: svg('<rect x="4" y="8" width="24" height="17" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M5 10l11 8 11-8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>'),
    pen: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 20l1-5L16 4l4 4L9 19z M14 6l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  };

  const wrap = el("div", "exo exo-medf");

  // ----- Header -----
  const head = el("header", "exo-medf__head");
  const ht = el("div", "exo-medf__head-text");
  if (kind) ht.appendChild(el("p", "exo-medf__kind", kind));
  const h = el("h3", "exo-medf__title");
  if (underline && title.includes(underline)) {
    const [a, b] = title.split(underline);
    h.append(document.createTextNode(a), el("span", "exo-medf__swoosh", underline), document.createTextNode(b));
  } else h.textContent = title;
  ht.appendChild(h);
  ht.appendChild(el("p", "exo-medf__intro", intro));
  if (introDe) ht.appendChild(el("p", "exo-medf__intro-de", introDe));
  head.appendChild(ht);
  const hs = el("div", "exo-medf__head-side");
  if (badge) {
    const bd = el("span", "exo-medf__badge");
    bd.innerHTML = svg('<circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 20l5-10 5 10M12.5 17h7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>', 20);
    bd.appendChild(el("span", "", badge));
    hs.appendChild(bd);
  }
  if (motto) hs.appendChild(el("p", "exo-medf__motto", motto));
  head.appendChild(hs);
  wrap.appendChild(head);

  // ----- The three stages -----
  const flow = el("div", "exo-medf__flow");
  wrap.appendChild(flow);
  const stage = (icon, no, label, heading, text, cls) => {
    const s = el("section", `exo-medf__stage ${cls}`);
    const top = el("div", "exo-medf__stage-top");
    const ic = el("span", "exo-medf__icon");
    ic.innerHTML = icon;
    const tx = el("div");
    const lab = el("p", "exo-medf__label");
    if (no) lab.appendChild(el("span", "exo-medf__no", no));
    lab.appendChild(el("span", "", label));
    tx.append(lab, el("h4", "exo-medf__h", heading), el("p", "exo-medf__text", text));
    top.append(ic, tx);
    s.appendChild(top);
    return s;
  };
  const arrow = () => {
    const a = el("span", "exo-medf__arrow", "→");
    a.setAttribute("aria-hidden", "true");
    return a;
  };

  // 1 · Remember
  const s1 = stage(ICON.head, "1", "Step 1", remember.title, remember.text, "exo-medf__stage--remember");
  const facts = el("ul", "exo-medf__facts");
  const factBtns = remember.facts.map((f, i) => {
    const li = el("li");
    const b = el("button", "exo-medf__fact");
    b.type = "button";
    b.append(el("span", "exo-medf__tick"), el("span", "", f));
    const key = `r${i}`;
    const set = (on) => {
      b.classList.toggle("exo-medf__fact--on", on);
      b.setAttribute("aria-pressed", String(on));
    };
    set(values[keyFor(key)] === "1");
    b.addEventListener("click", () => {
      const on = !b.classList.contains("exo-medf__fact--on");
      set(on);
      onChange(key, on ? "1" : "");
      paintCheck();
    });
    li.appendChild(b);
    facts.appendChild(li);
    return b;
  });
  s1.appendChild(facts);
  if (audio?.src) {
    const again = el("div", "exo-medf__again");
    const btn = el("button", "exo-medf__again-btn");
    btn.type = "button";
    btn.textContent = "🔊 Listen again";
    const player = new Audio();
    player.preload = "none";
    btn.addEventListener("click", () => {
      if (!player.src) player.src = audio.src;
      if (player.paused) {
        player.play().catch(() => {});
        btn.textContent = "⏸ Pause";
      } else {
        player.pause();
        btn.textContent = "🔊 Listen again";
      }
    });
    player.addEventListener("ended", () => (btn.textContent = "🔊 Listen again"));
    again.append(btn, el("span", "exo-medf__again-note", "only if your teacher allows it"));
    s1.appendChild(again);
  }
  flow.append(s1, arrow());

  // 2 · Explain in German
  const s2 = stage(ICON.trans, "", "Steps 2 – 4 · Auf Deutsch", explain.title, explain.text, "exo-medf__stage--explain");
  const items = el("ol", "exo-medf__items");
  const deFields = explain.items.map((it, i) => {
    const li = el("li", "exo-medf__item");
    li.appendChild(el("span", "exo-medf__item-no", String(i + 1).padStart(2, "0")));
    const body = el("div", "exo-medf__item-body");
    body.appendChild(el("strong", "", it.q));
    if (it.hint) body.appendChild(el("span", "exo-medf__item-hint", it.hint));
    const box = el("label", "exo-medf__field");
    const pen = el("span", "exo-medf__pen");
    pen.innerHTML = ICON.pen;
    // two short sentences fit: a small box that grows as the learner writes
    const input = el("textarea", "exo-medf__grow");
    input.rows = 2;
    input.placeholder = it.placeholder ?? "";
    input.setAttribute("aria-label", it.q);
    const key = `de${i}`;
    input.dataset.answerKey = keyFor(key);
    input.value = values[keyFor(key)] ?? "";
    const grow = () => {
      input.style.height = "auto";
      input.style.height = `${input.scrollHeight}px`;
    };
    input.addEventListener("input", () => {
      onChange(key, input.value);
      grow();
      paintCheck();
    });
    requestAnimationFrame(grow);
    box.append(pen, input);
    body.appendChild(box);
    li.appendChild(body);
    items.appendChild(li);
    return input;
  });
  s2.appendChild(items);
  flow.append(s2, arrow());

  // 3 · Ask Daniel in English
  const s3 = stage(ICON.mail, "4", "Final step · In English", ask.title, ask.text, "exo-medf__stage--ask");
  const qbox = el("label", "exo-medf__field exo-medf__field--big");
  const pen3 = el("span", "exo-medf__pen");
  pen3.innerHTML = ICON.pen;
  const q = el("textarea");
  q.rows = 4;
  q.placeholder = ask.placeholder ?? "";
  q.setAttribute("aria-label", ask.title);
  q.dataset.answerKey = keyFor("en");
  q.value = values[keyFor("en")] ?? "";
  qbox.append(pen3, q);
  const qNote = el("p", "exo-medf__qnote");
  q.addEventListener("input", () => {
    onChange("en", q.value);
    paintCheck();
  });
  s3.append(qbox, qNote);
  if (ask.motto) {
    const doodle = el("div", "exo-medf__doodle");
    doodle.innerHTML =
      '<svg viewBox="0 0 120 70" width="110" height="64" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M38 22l44-8 8 34-44 8z"/><path d="M38 22l28 20 16-28"/><path d="M22 20l8 4M18 34h9M22 48l8-4M96 12l6-5M100 28h9M96 44l6 5"/></g></svg>';
    doodle.appendChild(el("p", "", ask.motto));
    s3.appendChild(doodle);
  }
  flow.appendChild(s3);

  // ----- Before you finish: a live checklist -----
  const fin = el("section", "exo-medf__finish");
  const fh = el("div", "exo-medf__finish-head");
  fh.innerHTML = svg('<path d="M12 23h8M13 27h6M16 4a8 8 0 0 0-5 14c1 1 2 2 2 4h6c0-2 1-3 2-4A8 8 0 0 0 16 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M16 0v1M4 6l1 1M28 6l-1 1M1 16h1M30 16h1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>', 34);
  fh.appendChild(el("span", "", "Before you finish"));
  const checks = el("ul", "exo-medf__checks");
  const c1 = el("li");
  const c2 = el("li");
  checks.append(c1, c2);
  fin.append(fh, checks);
  fin.appendChild(el("p", "exo-medf__finish-note", "Use your memory first, then revisit the dialogue if your teacher allows it."));
  wrap.appendChild(fin);

  function paintCheck() {
    const done = deFields.filter((f) => f.value.trim()).length;
    c1.textContent = `All three key facts in German? ${done} / ${deFields.length}`;
    c1.className = done === deFields.length ? "exo-medf__ok" : "";
    const v = q.value.trim();
    const isQ = v.length > 0 && /\?\s*$/.test(v);
    c2.textContent = !v
      ? "A real question in English? — not yet"
      : isQ
        ? "A real question in English? ✓"
        : "A real question in English? Add a question mark (?)";
    c2.className = isQ ? "exo-medf__ok" : v ? "exo-medf__warn" : "";
    qNote.textContent = !v ? "" : isQ ? "✓ That is a question." : "Tip: a question ends with ?";
    qNote.className = `exo-medf__qnote${isQ ? " exo-medf__qnote--ok" : ""}`;
  }
  paintCheck();

  return wrap;
}

/**
 * "Make a change!" — persuasive-writing challenge. The learner picks one
 * improvement for their school (picture tiles, or their own idea), writes
 * an 80–100-word comment on a notebook page with a live word count, taps
 * colour-coded sentence starters into the text, and ticks a "Before you
 * submit" checklist.
 *
 * @param {{
 *   eyebrow?: string, title: string, tagline?: string, intro: string, introDe?: string,
 *   megaphone?: string, photo?: string, sticky?: string, corner?: string[],
 *   ideasTitle?: string, ideas: Array<{icon: string, en: string, de?: string}>, ownIdea?: string,
 *   editorTitle?: string, min?: number, max?: number, placeholder?: string, side?: string[],
 *   starters: Array<{label: string, tone: string, items: string[]}>,
 *   checksTitle?: string, checks: string[], footer?: string,
 *   values?: Record<string,string>,
 *   keyFor: (f: string) => string, onChange: (f: string, v: string) => void,
 * }} opts
 */
export function createChangeWriter({
  eyebrow, title, tagline, intro, introDe, megaphone, photo, sticky, corner,
  ideasTitle = "Ideas for improvement", ideas, ownIdea = "Or come up with your own idea!",
  editorTitle = "Write your comment", min = 80, max = 100, placeholder = "Write your comment here…", side,
  starters, checksTitle = "Before you submit", checks, footer,
  values = {}, keyFor, onChange,
}) {
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const img = (src, cls, alt = "") => {
    const i = el("img", cls);
    i.src = src;
    i.alt = alt;
    i.loading = "lazy";
    return i;
  };

  const wrap = el("div", "exo exo-chg");

  // ----- Header: title + tagline + art -----
  const head = el("header", "exo-chg__head");
  const ht = el("div", "exo-chg__head-text");
  if (eyebrow) ht.appendChild(el("p", "exo-chg__eyebrow", eyebrow));
  ht.appendChild(el("h3", "exo-chg__title", title));
  if (tagline) ht.appendChild(el("p", "exo-chg__tagline", tagline));
  const p = el("p", "exo-chg__intro");
  appendBolded(p, intro);
  ht.appendChild(p);
  if (introDe) ht.appendChild(el("p", "exo-chg__intro-de", introDe));
  head.appendChild(ht);

  const art = el("div", "exo-chg__art");
  if (photo) art.appendChild(img(photo, "exo-chg__photo"));
  if (megaphone) art.appendChild(img(megaphone, "exo-chg__mega"));
  if (sticky) art.appendChild(el("p", "exo-chg__sticky", sticky));
  if (corner) {
    const c = el("p", "exo-chg__corner");
    c.appendChild(el("span", "exo-chg__crown", "♛"));
    corner.forEach((t) => c.appendChild(el("span", "", t)));
    art.appendChild(c);
  }
  head.appendChild(art);
  wrap.appendChild(head);

  // ----- Body: ideas (left) + notebook (right) -----
  const body = el("div", "exo-chg__body");
  wrap.appendChild(body);

  const ideasBox = el("section", "exo-chg__ideas");
  ideasBox.appendChild(el("h4", "exo-chg__ideas-title", ideasTitle));
  const grid = el("div", "exo-chg__grid");
  const ownWrap = el("div", "exo-chg__own");
  const ownInput = el("input", "exo-chg__own-input");
  ownInput.type = "text";
  ownInput.placeholder = "My idea: …";
  ownInput.maxLength = 80;
  ownInput.dataset.answerKey = keyFor("own");
  ownInput.value = values[keyFor("own")] ?? "";
  let chosen = values[keyFor("idea")] ?? "";
  const tiles = ideas.map((idea, i) => {
    const t = el("button", "exo-chg__tile");
    t.type = "button";
    t.setAttribute("aria-pressed", "false");
    t.appendChild(img(idea.icon, "exo-chg__tile-icon"));
    t.appendChild(el("span", "exo-chg__tile-en", idea.en));
    if (idea.de) t.appendChild(el("span", "exo-chg__tile-de", idea.de));
    t.addEventListener("click", () => choose(String(i)));
    grid.appendChild(t);
    return t;
  });
  ideasBox.appendChild(grid);
  const ownBtn = el("button", "exo-chg__own-btn", ownIdea);
  ownBtn.type = "button";
  ownBtn.addEventListener("click", () => {
    choose("own");
    ownInput.focus();
  });
  ownWrap.append(ownBtn, ownInput);
  ideasBox.appendChild(ownWrap);
  ownInput.addEventListener("input", () => {
    onChange("own", ownInput.value);
    if (chosen !== "own") choose("own");
    else paintChoice();
  });
  body.appendChild(ideasBox);

  // notebook page
  const book = el("section", "exo-chg__book");
  const bh = el("div", "exo-chg__book-head");
  const penIc = el("span", "exo-chg__pen");
  penIc.innerHTML =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 20l1-5L16 4l4 4L9 19z M14 6l4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
  bh.append(penIc, el("h4", "exo-chg__book-title", editorTitle));
  const target = el("div", "exo-chg__target");
  target.append(el("span", "", `Target: ${min}–${max} words`), el("span", "exo-chg__count"));
  bh.appendChild(target);
  book.appendChild(bh);
  const choiceLine = el("p", "exo-chg__choice");
  book.appendChild(choiceLine);

  const page = el("div", "exo-chg__page");
  const ta = el("textarea", "exo-chg__text");
  ta.placeholder = placeholder;
  ta.rows = 7;
  ta.dataset.answerKey = keyFor("text");
  ta.value = values[keyFor("text")] ?? "";
  ta.setAttribute("aria-label", editorTitle);
  page.appendChild(ta);
  if (side) {
    const s = el("p", "exo-chg__side");
    side.forEach((t) => s.appendChild(el("span", "", t)));
    page.appendChild(s);
  }
  book.appendChild(page);
  const count = target.querySelector(".exo-chg__count");
  const words = () => (ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0);
  const paintCount = () => {
    const n = words();
    count.textContent = `${n}/${max}`;
    count.className = `exo-chg__count${n >= min && n <= max ? " exo-chg__count--ok" : n > max ? " exo-chg__count--over" : ""}`;
  };
  ta.addEventListener("input", () => {
    onChange("text", ta.value);
    paintCount();
  });

  // sentence starters (tap to insert at the cursor)
  const st = el("div", "exo-chg__starters");
  const sth = el("button", "exo-chg__starters-head");
  sth.type = "button";
  sth.setAttribute("aria-expanded", "true");
  sth.append(el("span", "exo-chg__bulb", "💡"), el("span", "", "Sentence starters"), el("span", "exo-chg__chev", "▾"));
  st.appendChild(sth);
  const cols = el("div", "exo-chg__cols");
  starters.forEach((g, gi) => {
    const col = el("div", `exo-chg__col exo-chg__col--${g.tone}`);
    col.appendChild(el("span", "exo-chg__col-label", `${gi + 1}. ${g.label}`));
    const ul = el("ul");
    g.items.forEach((s) => {
      const li = el("li");
      const b = el("button", "exo-chg__chip", s);
      b.type = "button";
      b.addEventListener("pointerdown", (e) => e.preventDefault());
      b.addEventListener("click", () => {
        const text = s.replace(/\s*…$/, "").trimEnd() + " ";
        const at = ta.selectionStart ?? ta.value.length;
        const before = ta.value.slice(0, at);
        const pad = before && !/\s$/.test(before) ? " " : "";
        ta.value = before + pad + text + ta.value.slice(ta.selectionEnd ?? at);
        const pos = (before + pad + text).length;
        ta.focus();
        ta.setSelectionRange(pos, pos);
        onChange("text", ta.value);
        paintCount();
      });
      li.appendChild(b);
      ul.appendChild(li);
    });
    col.appendChild(ul);
    cols.appendChild(col);
  });
  st.appendChild(cols);
  sth.addEventListener("click", () => {
    cols.hidden = !cols.hidden;
    sth.setAttribute("aria-expanded", String(!cols.hidden));
    st.classList.toggle("exo-chg__starters--closed", cols.hidden);
  });
  book.appendChild(st);
  body.appendChild(book);

  // ----- Before you submit -----
  const fin = el("section", "exo-chg__finish");
  const fh = el("div", "exo-chg__finish-head");
  fh.innerHTML =
    '<svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true"><rect x="6" y="5" width="20" height="24" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="11" y="2.5" width="10" height="5" rx="1.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M11 18l4 4 7-8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  fh.appendChild(el("span", "", checksTitle));
  fin.appendChild(fh);
  checks.forEach((c, i) => {
    const lab = el("label", "exo-chg__check");
    const cb = el("input");
    cb.type = "checkbox";
    const key = `c${i}`;
    cb.checked = values[keyFor(key)] === "1";
    cb.addEventListener("change", () => onChange(key, cb.checked ? "1" : ""));
    lab.append(cb, el("span", "", c));
    fin.appendChild(lab);
  });
  if (footer) {
    const f = el("p", "exo-chg__footer");
    f.appendChild(el("span", "", footer));
    fin.appendChild(f);
  }
  wrap.appendChild(fin);

  // ----- Idea choice -----
  function paintChoice() {
    tiles.forEach((t, i) => {
      const on = chosen === String(i);
      t.classList.toggle("exo-chg__tile--on", on);
      t.setAttribute("aria-pressed", String(on));
    });
    ownWrap.classList.toggle("exo-chg__own--on", chosen === "own");
    const label =
      chosen === "own"
        ? ownInput.value.trim() || "your own idea"
        : chosen !== ""
          ? ideas[Number(chosen)]?.en
          : "";
    choiceLine.textContent = label ? `Your idea: ${label}` : "First choose an idea on the left — or your own.";
    choiceLine.classList.toggle("exo-chg__choice--set", !!label);
  }
  function choose(v) {
    chosen = chosen === v && v !== "own" ? "" : v;
    onChange("idea", chosen);
    paintChoice();
  }
  paintChoice();
  paintCount();

  return wrap;
}

/* ---------- Speaking (Unit 2) — visual widgets ---------- */

/** Read an English phrase aloud (Web Speech); silently does nothing without it. */
function sayAloud(text, rate = 0.9) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/[“”"]/g, ""));
    u.lang = "en-GB";
    u.rate = rate;
    synth.speak(u);
  } catch {
    /* no speech on this device */
  }
}

/** A move's picture: the generated illustration if there is one, else its emoji badge. */
function moveBadge(m, cls) {
  const b = document.createElement("span");
  b.className = `${cls} exo-moves--${m.tone}`;
  if (m.image) {
    const img = document.createElement("img");
    img.src = m.image;
    img.alt = "";
    img.loading = "lazy";
    b.appendChild(img);
  } else {
    b.textContent = m.icon;
  }
  return b;
}

/**
 * The four conversation moves as picture cards: picture/icon, name (EN +
 * DE), what it does, and phrases you can tap to hear (with German).
 *
 * @param {{ moves: Array<{key: string, icon: string, image?: string, tone: string,
 *   name: string, nameDe: string, tip: string, tipDe?: string, phrases: Array<[string, string]>}> }} opts
 */
export function createTalkMoves({ moves }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-moves";
  moves.forEach((m) => {
    const card = document.createElement("section");
    card.className = `exo-moves__card exo-moves__card--${m.tone}`;
    card.appendChild(moveBadge(m, "exo-moves__pic"));
    const h = document.createElement("h4");
    h.className = "exo-moves__name";
    h.textContent = m.name;
    const de = document.createElement("p");
    de.className = "exo-moves__name-de";
    de.textContent = m.nameDe;
    const tip = document.createElement("p");
    tip.className = "exo-moves__tip";
    tip.textContent = m.tip;
    card.append(h, de, tip);
    const ul = document.createElement("ul");
    ul.className = "exo-moves__phrases";
    m.phrases.forEach(([en, deP]) => {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "exo-moves__phrase";
      b.setAttribute("aria-label", `Hear: ${en}`);
      const e = document.createElement("span");
      e.className = "exo-moves__en";
      e.textContent = en;
      const d = document.createElement("span");
      d.className = "exo-moves__de";
      d.textContent = deP;
      b.append(e, d);
      b.addEventListener("click", () => sayAloud(en));
      li.appendChild(b);
      ul.appendChild(li);
    });
    card.appendChild(ul);
    wrap.appendChild(card);
  });
  return wrap;
}

/**
 * "Which move is it?" with pictures: each sentence gets the four move
 * buttons. A right pick locks green; a wrong pick is crossed out and the
 * learner tries again — the answer is never shown. Sentences are shuffled.
 *
 * @param {{ moves: Array<{key: string, icon: string, image?: string, tone: string, name: string, nameDe: string}>,
 *   items: Array<{say: string, de?: string, answer: string}> }} opts
 */
export function createMovePick({ moves, items }) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-mpick";
  const score = document.createElement("p");
  score.className = "exo-mpick__score";
  let right = 0;
  const paint = () => {
    score.textContent = right === items.length ? `✔ All ${items.length} right — great!` : `${right} / ${items.length} right`;
    score.classList.toggle("exo-mpick__score--done", right === items.length);
  };
  shuffledCopy(items).forEach((it) => {
    const row = document.createElement("div");
    row.className = "exo-mpick__row";
    const bubble = document.createElement("button");
    bubble.type = "button";
    bubble.className = "exo-mpick__bubble";
    bubble.setAttribute("aria-label", `Hear: ${it.say}`);
    const s = document.createElement("span");
    s.textContent = it.say;
    bubble.appendChild(s);
    if (it.de) {
      const d = document.createElement("span");
      d.className = "exo-mpick__de";
      d.textContent = it.de;
      bubble.appendChild(d);
    }
    bubble.addEventListener("click", () => sayAloud(it.say));
    const opts = document.createElement("div");
    opts.className = "exo-mpick__opts";
    let solved = false;
    moves.forEach((m) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `exo-mpick__opt exo-mpick__opt--${m.tone}`;
      b.appendChild(moveBadge(m, "exo-mpick__icon"));
      const n = document.createElement("span");
      n.className = "exo-mpick__name";
      n.textContent = m.name;
      const nd = document.createElement("span");
      nd.className = "exo-mpick__name-de";
      nd.textContent = m.nameDe;
      b.append(n, nd);
      b.addEventListener("click", () => {
        if (solved || b.disabled) return;
        if (m.key === it.answer) {
          solved = true;
          right += 1;
          b.classList.add("exo-mpick__opt--right");
          row.classList.add("exo-mpick__row--done");
          opts.querySelectorAll("button").forEach((x) => (x.disabled = true));
          paint();
        } else {
          b.classList.add("exo-mpick__opt--wrong");
          b.disabled = true;
        }
      });
      opts.appendChild(b);
    });
    row.append(bubble, opts);
    wrap.appendChild(row);
  });
  wrap.appendChild(score);
  paint();
  return wrap;
}

/**
 * Plan your project part: pick a topic and a way to do it from picture
 * tiles (one each), see the plan as one sentence, then fill in the rest.
 *
 * @param {{ topics: Array<{icon: string, en: string, de?: string}>, formats: Array<{icon: string, image?: string, en: string, de?: string}>,
 *   starters: string[], values?: Record<string,string>,
 *   keyFor: (f: string) => string, onChange: (f: string, v: string) => void }} opts
 */
export function createPlanBuilder({ topics, formats, starters, values = {}, keyFor, onChange }) {
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const wrap = el("div", "exo exo-plan");
  const pick = { topic: values[keyFor("topic")] ?? "", format: values[keyFor("format")] ?? "" };
  const summary = el("p", "exo-plan__summary");
  const groups = {};

  const tileRow = (field, title, list) => {
    const sec = el("section", "exo-plan__sec");
    sec.appendChild(el("h4", "exo-plan__h", title));
    const row = el("div", `exo-plan__tiles exo-plan__tiles--${field}`);
    groups[field] = list.map((t, i) => {
      const b = el("button", "exo-plan__tile");
      b.type = "button";
      if (t.image) {
        const img = el("img", "exo-plan__img");
        img.src = t.image;
        img.alt = "";
        img.loading = "lazy";
        b.appendChild(img);
      } else b.appendChild(el("span", "exo-plan__icon", t.icon));
      b.appendChild(el("span", "exo-plan__en", t.en));
      if (t.de) b.appendChild(el("span", "exo-plan__de", t.de));
      if (t.idea) b.appendChild(el("span", "exo-plan__idea", t.idea));
      b.addEventListener("click", () => {
        pick[field] = pick[field] === String(i) ? "" : String(i);
        onChange(field, pick[field]);
        paint();
      });
      row.appendChild(b);
      return b;
    });
    sec.appendChild(row);
    wrap.appendChild(sec);
  };
  tileRow("topic", "A topic", topics);
  tileRow("format", "A way to do it", formats);
  wrap.appendChild(summary);

  const list = el("div", "exo-plan__rows");
  (starters ?? []).forEach((st, k) => {
    const row = el("label", "exo-plan__row");
    row.appendChild(el("span", "exo-plan__label", st));
    const input = el("input", "exo-plan__input");
    input.type = "text";
    const key = `s${k + 1}`;
    input.dataset.answerKey = keyFor(key);
    input.value = values[keyFor(key)] ?? "";
    input.addEventListener("input", () => onChange(key, input.value));
    row.appendChild(input);
    list.appendChild(row);
  });
  if (starters?.length) wrap.appendChild(list);

  function paint() {
    for (const field of ["topic", "format"]) {
      groups[field].forEach((b, i) => b.classList.toggle("exo-plan__tile--on", pick[field] === String(i)));
    }
    const t = topics[Number(pick.topic)];
    const f = formats[Number(pick.format)];
    summary.textContent =
      pick.topic !== "" && pick.format !== ""
        ? `My plan: ${f.en.toLowerCase()} — ${t.en.toLowerCase()}.`
        : "Tap a topic and a way.";
    summary.classList.toggle("exo-plan__summary--set", pick.topic !== "" && pick.format !== "");
  }
  paint();
  return wrap;
}

/**
 * A practice stopwatch for speaking tasks: start, watch the ring run
 * down, "Time's up!" at zero. Nothing is recorded.
 * @param {{ seconds?: number, label?: string, labelDe?: string }} opts
 */
export function createPractiseTimer({ seconds = 60, label = "Practise out loud", labelDe = "Sprich laut und stopp die Zeit." } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "exo exo-timer";
  const R = 34;
  const C = 2 * Math.PI * R;
  wrap.innerHTML = `<svg class="exo-timer__ring" viewBox="0 0 80 80" width="88" height="88" aria-hidden="true"><circle cx="40" cy="40" r="${R}" class="exo-timer__track"/><circle cx="40" cy="40" r="${R}" class="exo-timer__bar" stroke-dasharray="${C}" stroke-dashoffset="0"/></svg>`;
  const ring = wrap.querySelector(".exo-timer__bar");
  const time = document.createElement("span");
  time.className = "exo-timer__time";
  const side = document.createElement("div");
  side.className = "exo-timer__side";
  const t = document.createElement("strong");
  t.textContent = label;
  const td = document.createElement("span");
  td.className = "exo-timer__de";
  td.textContent = labelDe;
  const btns = document.createElement("div");
  btns.className = "exo-timer__btns";
  const start = document.createElement("button");
  start.type = "button";
  start.className = "exo-timer__start";
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "exo-timer__reset";
  reset.textContent = "↺ Reset";
  btns.append(start, reset);
  side.append(t, td, btns);
  wrap.append(time, side);

  let left = seconds;
  let timer = null;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const paint = () => {
    time.textContent = left > 0 ? fmt(left) : "Time's up!";
    ring.setAttribute("stroke-dashoffset", String(C * (1 - left / seconds)));
    wrap.classList.toggle("exo-timer--done", left === 0);
    wrap.classList.toggle("exo-timer--running", !!timer);
    start.textContent = timer ? "⏸ Pause" : left === seconds ? `▶ Start ${seconds} s` : "▶ Go on";
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  start.addEventListener("click", () => {
    if (timer) stop();
    else if (left > 0) {
      timer = setInterval(() => {
        left -= 1;
        if (left <= 0) {
          left = 0;
          stop();
        }
        paint();
      }, 1000);
    }
    paint();
  });
  reset.addEventListener("click", () => {
    stop();
    left = seconds;
    paint();
  });
  paint();
  return wrap;
}

/**
 * Partner work: write a two-minute dialogue in which two students present
 * their own project ideas, try to convince each other and decide together.
 * Names and ideas first, then one row per turn (A / B alternate) with a
 * stage hint (EN + DE) and tap-to-insert phrases. A live length bar
 * estimates the speaking time; "Hear our dialogue" reads it aloud in two
 * voices; a two-minute timer is there for rehearsing.
 *
 * @param {{
 *   turns: Array<{who: "A"|"B", stage: string, hint?: string, hintDe?: string, phrases?: string[]}>,
 *   targetWords?: [number, number], seconds?: number,
 *   values?: Record<string,string>,
 *   keyFor: (f: string) => string, onChange: (f: string, v: string) => void,
 * }} opts
 */
export function createDialogueWriter({ turns, targetWords = [180, 260], seconds = 120, values = {}, keyFor, onChange }) {
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const field = (key, tag, cls, placeholder) => {
    const f = el(tag, cls);
    if (tag === "input") f.type = "text";
    f.placeholder = placeholder;
    f.dataset.answerKey = keyFor(key);
    f.value = values[keyFor(key)] ?? "";
    f.addEventListener("input", () => {
      onChange(key, f.value);
      paint();
    });
    return f;
  };

  const wrap = el("div", "exo exo-dlg");

  // ----- 1 · Who are you, what are your ideas? -----
  const cast = el("section", "exo-dlg__cast");
  const pair = el("div", "exo-dlg__pair");
  const side = (who) => {
    const box = el("div", `exo-dlg__side exo-dlg__side--${who.toLowerCase()}`);
    box.appendChild(el("span", "exo-dlg__badge", who));
    const name = field(`name${who}`, "input", "exo-dlg__name", `Partner ${who}: name`);
    const idea = field(`idea${who}`, "input", "exo-dlg__idea", "Project idea");
    box.append(name, idea);
    pair.appendChild(box);
    return { name, idea };
  };
  const A = side("A");
  pair.appendChild(el("span", "exo-dlg__vs", "🤝"));
  const B = side("B");
  cast.appendChild(pair);
  wrap.appendChild(cast);
  const nameOf = (who) => ((who === "A" ? A : B).name.value.trim() || `Partner ${who}`);

  // ----- 2 · The dialogue, turn by turn -----
  const script = el("section", "exo-dlg__script");
  const rows = turns.map((t, i) => {
    const row = el("div", `exo-dlg__turn exo-dlg__turn--${t.who.toLowerCase()}`);
    const who = el("span", "exo-dlg__who");
    const stage = el("p", "exo-dlg__stage");
    stage.append(el("strong", "", t.stage));
    if (t.stageDe) stage.append(el("span", "exo-dlg__hint-de", t.stageDe));
    // the hint lives in the box itself — no extra lines on the card
    const ta = field(`t${i + 1}`, "textarea", "exo-dlg__line", t.hint ?? "…");
    ta.rows = 2;
    const body = el("div", "exo-dlg__body");
    body.append(stage, ta);
    if (t.phrases?.length) {
      const chips = el("div", "exo-dlg__chips");
      t.phrases.forEach((p) => {
        const c = el("button", "exo-dlg__chip", p);
        c.type = "button";
        c.addEventListener("pointerdown", (e) => e.preventDefault());
        c.addEventListener("click", () => {
          const text = p.replace(/\s*…$/, "").trimEnd() + " ";
          const at = document.activeElement === ta ? ta.selectionStart : ta.value.length;
          const before = ta.value.slice(0, at);
          const pad = before && !/\s$/.test(before) ? " " : "";
          ta.value = before + pad + text + ta.value.slice(at);
          ta.focus();
          const pos = (before + pad + text).length;
          ta.setSelectionRange(pos, pos);
          onChange(`t${i + 1}`, ta.value);
          paint();
        });
        chips.appendChild(c);
      });
      body.appendChild(chips);
    }
    row.append(who, body);
    script.appendChild(row);
    return { who, ta, t };
  });
  wrap.appendChild(script);

  // ----- 3 · Length, listen, rehearse -----
  const check = el("section", "exo-dlg__check");
  const meter = el("div", "exo-dlg__meter");
  const bar = el("span", "exo-dlg__bar");
  const fill = el("span", "exo-dlg__fill");
  bar.appendChild(fill);
  const len = el("p", "exo-dlg__len");
  meter.append(bar, len);
  check.appendChild(meter);
  const listen = el("button", "exo-dlg__listen", "▶ Hear our dialogue");
  listen.type = "button";
  check.appendChild(listen);
  check.appendChild(createPractiseTimer({ seconds, label: "Rehearse — 2 minutes", labelDe: "Übt zu zweit mit der Uhr — dann präsentiert ihr." }));
  wrap.appendChild(check);

  // two voices, turn after turn
  listen.addEventListener("click", () => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const voices = synth.getVoices().filter((v) => /^en/i.test(v.lang));
    rows.forEach(({ ta, t }) => {
      const text = ta.value.trim();
      if (!text) return;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      u.rate = 0.95;
      if (voices.length > 1) u.voice = voices[t.who === "A" ? 0 : 1];
      else u.pitch = t.who === "A" ? 1.15 : 0.8;
      synth.speak(u);
    });
  });

  function paint() {
    rows.forEach(({ who, t }) => (who.textContent = nameOf(t.who)));
    const words = rows.reduce((n, r) => n + (r.ta.value.trim() ? r.ta.value.trim().split(/\s+/).length : 0), 0);
    const [lo, hi] = targetWords;
    const secs = Math.round((words / 110) * 60);
    fill.style.width = `${Math.min(100, (words / hi) * 100)}%`;
    meter.classList.toggle("exo-dlg__meter--ok", words >= lo && words <= hi);
    meter.classList.toggle("exo-dlg__meter--over", words > hi);
    len.textContent = !words
      ? `Aim for about ${lo}–${hi} words (≈ 2 minutes).`
      : `${words} words ≈ ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")} min — ${
          words < lo ? "a bit short, add more reasons or questions." : words > hi ? "a bit long, make some lines shorter." : "good length!"
        }`;
  }
  paint();
  return wrap;
}

/**
 * "Your speaking week" — the Speaking start card (user's design): title
 * with highlighter, mission picture, four coloured steps with arrows and
 * a "Your first line" strip you can tap to hear. Steps and the first line
 * may carry a German line (`de`) for LE.
 *
 * @param {{ eyebrow?: string, title: string, tagline?: string, lead?: string, text?: string, textDe?: string,
 *   scene?: string, mission?: string, stepsTitle?: string,
 *   steps: Array<{icon: string, title: string, sub?: string, text: string, de?: string, tone: string}>,
 *   firstLine?: {label: string, icon?: string, quote: string, de?: string}, goodLuck?: string }} opts
 */
export function createSpeakWeek({ eyebrow, title, tagline, lead, text, textDe, scene, mission, stepsTitle, steps, firstLine, goodLuck }) {
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  const img = (src, cls) => {
    const i = el("img", cls);
    i.src = src;
    i.alt = "";
    i.loading = "lazy";
    return i;
  };
  const wrap = el("div", "exo exo-sweek");

  const head = el("header", "exo-sweek__head");
  const ht = el("div", "exo-sweek__head-text");
  if (eyebrow) ht.appendChild(el("p", "exo-sweek__eyebrow", eyebrow));
  ht.appendChild(el("h3", "exo-sweek__title", title));
  if (tagline) ht.appendChild(el("p", "exo-sweek__tagline", tagline));
  if (lead) ht.appendChild(el("p", "exo-sweek__lead", lead));
  if (text) ht.appendChild(el("p", "exo-sweek__text", text));
  if (textDe) ht.appendChild(el("p", "exo-sweek__de", textDe));
  head.appendChild(ht);
  if (scene) {
    const fig = el("figure", "exo-sweek__scene");
    fig.appendChild(img(scene, "exo-sweek__scene-img"));
    if (mission) fig.appendChild(el("figcaption", "exo-sweek__mission", mission));
    head.appendChild(fig);
  }
  wrap.appendChild(head);

  if (stepsTitle) wrap.appendChild(el("h4", "exo-sweek__steps-title", stepsTitle));
  const row = el("ol", "exo-sweek__steps");
  steps.forEach((s) => {
    const li = el("li", `exo-sweek__step exo-sweek__step--${s.tone}`);
    const top = el("div", "exo-sweek__step-top");
    top.appendChild(img(s.icon, "exo-sweek__step-icon"));
    const name = el("span", "exo-sweek__step-name");
    name.appendChild(el("strong", "", s.title));
    if (s.sub) name.appendChild(el("span", "", s.sub));
    top.appendChild(name);
    li.append(top, el("p", "exo-sweek__step-text", s.text));
    if (s.de) li.appendChild(el("p", "exo-sweek__step-de", s.de));
    row.appendChild(li);
  });
  wrap.appendChild(row);

  if (firstLine || goodLuck) {
    const foot = el("div", "exo-sweek__foot");
    if (firstLine) {
      const fl = el("button", "exo-sweek__first");
      fl.type = "button";
      fl.setAttribute("aria-label", `Hear: ${firstLine.quote}`);
      if (firstLine.icon) fl.appendChild(img(firstLine.icon, "exo-sweek__first-icon"));
      fl.appendChild(el("span", "exo-sweek__first-label", firstLine.label));
      const q = el("span", "exo-sweek__first-say");
      q.appendChild(el("span", "exo-sweek__first-quote", `“${firstLine.quote}”`));
      if (firstLine.de) q.appendChild(el("span", "exo-sweek__first-de", firstLine.de));
      fl.appendChild(q);
      fl.addEventListener("click", () => sayAloud(firstLine.quote.replace(/…/g, "")));
      foot.appendChild(fl);
    }
    if (goodLuck) foot.appendChild(el("p", "exo-sweek__luck", goodLuck));
    wrap.appendChild(foot);
  }
  return wrap;
}

/**
 * The sentence a learner can say for a topic + result pick, e.g. "I think
 * we should make a poster about prejudice." Needs `about`/`make` on the
 * picks (German: `aboutDe`, `obj` + `verb`); null when they are missing.
 *
 * @param {{about?: string, aboutDe?: string}} topic
 * @param {{make?: string, obj?: string, verb?: string}} result
 */
export function ideaProposal(topic, result) {
  if (!topic?.about || !result?.make) return null;
  return {
    en: `I think we should ${result.make} about ${topic.about}.`,
    de: result.obj && topic.aboutDe ? `Ich finde, wir sollten ${result.obj} ${topic.aboutDe} ${result.verb}.` : "",
  };
}

/**
 * "What should our school do?" — the idea generator (user's design): pick
 * a project topic and a final result from picture tiles; the proposal
 * strip turns the two picks into a sentence to say in the talk (tap to
 * hear). With `speak`, tapping a tile also reads its English aloud (LE).
 *
 * @param {{ taskNo: number, eyebrow?: string, title: string, intro: string, highlight?: string, introDe?: string,
 *   scene?: string, badge?: string, motto?: string[], speak?: boolean,
 *   topicsTitle: string, topicsSub?: string, topicsIcon?: string,
 *   topics: Array<{icon: string, en: string, idea?: string, de?: string, about?: string, aboutDe?: string, tone: string}>,
 *   resultsTitle: string, resultsSub?: string, resultsIcon?: string,
 *   results: Array<{icon: string, en: string, de?: string, make?: string, obj?: string, verb?: string, tone: string}>,
 *   proposalTitle: string, proposalText: string, proposalIcon?: string, sayLabel?: string, note?: string,
 *   values?: Record<string,string>, keyFor: (f: string) => string, onChange: (f: string, v: string) => void }} o
 */
export function createIdeaGenerator(o) {
  const { values = {}, keyFor, onChange } = o;
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  const img = (src, cls) => {
    const i = el("img", cls);
    i.src = src;
    i.alt = "";
    i.loading = "lazy";
    return i;
  };
  const wrap = el("div", "exo exo-igen");
  const pick = { topic: values[keyFor("topic")] ?? "", format: values[keyFor("format")] ?? "" };

  // header
  const head = el("header", "exo-igen__head");
  const ht = el("div", "exo-igen__head-text");
  ht.appendChild(el("p", "exo-igen__eyebrow", o.eyebrow ?? `Task ${o.taskNo} · Sprechen`));
  ht.appendChild(el("h3", "exo-igen__title", o.title));
  const intro = el("p", "exo-igen__intro", o.intro);
  if (o.highlight) intro.append(" ", el("mark", "exo-igen__mark", o.highlight));
  ht.appendChild(intro);
  if (o.introDe) ht.appendChild(el("p", "exo-igen__de", o.introDe));
  head.appendChild(ht);
  const art = el("div", "exo-igen__art");
  if (o.badge) art.appendChild(el("span", "exo-igen__badge", o.badge));
  if (o.motto) {
    const m = el("p", "exo-igen__motto");
    o.motto.forEach((t) => m.appendChild(el("span", "", t)));
    art.appendChild(m);
  }
  if (o.scene) art.appendChild(img(o.scene, "exo-igen__scene"));
  head.appendChild(art);
  wrap.appendChild(head);

  // a pick row: heading band + tiles
  const groups = {};
  const band = (tone, icon, title, sub) => {
    const b = el("div", `exo-igen__band exo-igen__band--${tone}`);
    if (icon) b.appendChild(img(icon, "exo-igen__band-icon"));
    const t = el("div", "exo-igen__band-text");
    t.appendChild(el("h4", "", title));
    if (sub) t.appendChild(el("p", "", sub));
    b.appendChild(t);
    return b;
  };
  const tiles = (field, list, cls) => {
    const grid = el("div", `exo-igen__tiles ${cls}`);
    groups[field] = list.map((t, i) => {
      const b = el("button", `exo-igen__tile exo-igen__tile--${t.tone}`);
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      const top = el("span", "exo-igen__tile-top");
      top.append(img(t.icon, "exo-igen__tile-icon"), el("strong", "exo-igen__tile-en", t.en));
      b.appendChild(top);
      if (t.idea) b.appendChild(el("span", "exo-igen__tile-idea", t.idea));
      if (t.de) b.appendChild(el("span", "exo-igen__tile-de", t.de));
      b.addEventListener("click", () => {
        pick[field] = pick[field] === String(i) ? "" : String(i);
        if (o.speak && pick[field] !== "") sayAloud(t.en);
        onChange(field, pick[field]);
        paint();
      });
      grid.appendChild(b);
      return b;
    });
    return grid;
  };
  wrap.appendChild(band("blue", o.topicsIcon, o.topicsTitle, o.topicsSub));
  wrap.appendChild(tiles("topic", o.topics, "exo-igen__tiles--topics"));
  wrap.appendChild(band("peach", o.resultsIcon, o.resultsTitle, o.resultsSub));
  wrap.appendChild(tiles("format", o.results, "exo-igen__tiles--results"));

  // proposal strip: the picks become a sentence to say
  const strip = el("div", "exo-igen__proposal");
  if (o.proposalIcon) strip.appendChild(img(o.proposalIcon, "exo-igen__proposal-icon"));
  const pt = el("div", "exo-igen__proposal-text");
  pt.appendChild(el("h4", "", o.proposalTitle));
  const ptxt = el("p", "exo-igen__proposal-p");
  const pde = el("p", "exo-igen__proposal-de");
  pt.append(ptxt, pde);
  strip.appendChild(pt);
  const hear = el("button", "exo-igen__hear", o.sayLabel ?? "🔊 Hear it");
  hear.type = "button";
  strip.appendChild(hear);
  if (o.note) strip.appendChild(el("p", "exo-igen__note", o.note));
  wrap.appendChild(strip);
  let sentence = "";
  hear.addEventListener("click", () => sentence && sayAloud(sentence));

  function paint() {
    for (const f of ["topic", "format"]) {
      groups[f].forEach((b, i) => {
        const on = pick[f] === String(i);
        b.classList.toggle("exo-igen__tile--on", on);
        b.setAttribute("aria-pressed", String(on));
      });
    }
    const t = o.topics[Number(pick.topic)];
    const r = o.results[Number(pick.format)];
    const both = pick.topic !== "" && pick.format !== "";
    const say = both ? ideaProposal(t, r) : null;
    sentence = say?.en ?? "";
    if (say) ptxt.replaceChildren(el("strong", "", `“${say.en}”`));
    else if (both) ptxt.replaceChildren(document.createTextNode("My proposal: "), el("strong", "", `${r.en} — ${t.en.toLowerCase()}`));
    else ptxt.textContent = o.proposalText;
    pde.textContent = say?.de ?? "";
    pde.hidden = !say?.de;
    hear.hidden = !say;
    strip.classList.toggle("exo-igen__proposal--set", both);
  }
  paint();
  return wrap;
}

/**
 * "The words of this lesson" (user's design): picture word cards — tap one
 * to hear the word; its German meaning appears under it.
 *
 * @param {{ tap?: string, tapDe?: string, motto?: string[],
 *   words: Array<{img: string, en: string, de: string}> }} opts
 */
export function createWordCards({ tap, tapDe, motto, words }) {
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;
    return n;
  };
  const wrap = el("div", "exo exo-wcards");
  if (tap || motto) {
    const top = el("div", "exo-wcards__top");
    const t = el("div", "exo-wcards__tap");
    if (tap) t.appendChild(el("p", "exo-wcards__tap-en", tap));
    if (tapDe) t.appendChild(el("p", "exo-wcards__tap-de", tapDe));
    top.appendChild(t);
    if (motto) {
      const m = el("p", "exo-wcards__motto");
      motto.forEach((line) => m.appendChild(el("span", "", line)));
      top.appendChild(m);
    }
    wrap.appendChild(top);
  }
  const grid = el("div", "exo-wcards__grid");
  words.forEach((w) => {
    const b = el("button", "exo-wcards__card");
    b.type = "button";
    b.setAttribute("aria-label", `${w.en} — ${w.de}`);
    const pic = el("img", "exo-wcards__pic");
    pic.src = w.img;
    pic.alt = "";
    pic.loading = "lazy";
    const txt = el("span", "exo-wcards__text");
    txt.append(el("span", "exo-wcards__en", w.en), el("span", "exo-wcards__de", w.de));
    b.append(pic, txt);
    b.addEventListener("click", () => {
      b.classList.add("exo-wcards__card--open");
      sayAloud(w.en.replace(/sth\./g, "something"), 0.85);
    });
    grid.appendChild(b);
  });
  wrap.appendChild(grid);
  return wrap;
}
