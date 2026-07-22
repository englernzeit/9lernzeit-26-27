/**
 * Minimal PDF writer — no libraries, no print dialog.
 *
 * Produces a single A4 page: black Helvetica on white, thin rules,
 * no fills — printer-friendly and ink-saving by construction.
 * Text uses WinAnsi encoding, so German umlauts/ß print correctly.
 *
 * Only what the answer sheet needs is implemented: absolute-
 * positioned text lines and horizontal rules. Content that would
 * overflow the page is cut with an ellipsis line (one page, always).
 */

const PAGE_W = 595; // A4 portrait, points
const PAGE_H = 842;
const MARGIN = 50;
const BOTTOM = 56;

/**
 * @param {{
 *   title: string,
 *   subtitle: string,
 *   name: string,
 *   date: string,
 *   steps: Array<{heading: string, items: Array<{label: string, answer: string}>}>,
 *   posters?: Array<{dataUrl: string, w: number, h: number, caption?: string}>,
 * }} doc
 * @returns {Blob}
 */
export function buildAnswerSheetPdf(doc) {
  const ops = [];
  let y = PAGE_H - 64;

  const text = (x, yy, font, size, str) => {
    ops.push(`BT /${font} ${size} Tf ${x} ${yy.toFixed(1)} Td (${escapeText(str)}) Tj ET`);
  };
  const rule = (x1, yy, x2, width = 0.5) => {
    ops.push(`${width} w ${x1} ${yy.toFixed(1)} m ${x2} ${yy.toFixed(1)} l S`);
  };

  // Header
  text(MARGIN, y, "F2", 16, doc.title);
  y -= 16;
  text(MARGIN, y, "F1", 11, doc.subtitle);
  y -= 24;
  text(MARGIN, y, "F1", 11, `Name: ${doc.name}`);
  text(PAGE_W - MARGIN - 130, y, "F1", 11, `Date: ${doc.date}`);
  y -= 6;
  rule(MARGIN, y, PAGE_W - MARGIN, 0.8);
  y -= 20;

  // Small copies of the finished posters, side by side.
  const images = [];
  const posters = (doc.posters ?? []).filter((p) => p && p.dataUrl && p.w && p.h);
  if (posters.length) {
    const gap = 16;
    const usable = PAGE_W - 2 * MARGIN;
    const pw = (usable - gap * (posters.length - 1)) / posters.length;
    let maxPh = 0;
    posters.forEach((p, i) => {
      const ph = pw * (p.h / p.w);
      maxPh = Math.max(maxPh, ph);
      const x = MARGIN + i * (pw + gap);
      if (p.caption) text(x, y, "F2", 9, p.caption);
      const imgTop = y - 12;
      ops.push(
        `q ${pw.toFixed(2)} 0 0 ${ph.toFixed(2)} ${x.toFixed(2)} ${(imgTop - ph).toFixed(2)} cm /Im${i} Do Q`,
      );
      images.push({ data: dataUrlToBinary(p.dataUrl), w: p.w, h: p.h });
    });
    y -= 12 + maxPh + 16;
    rule(MARGIN, y, PAGE_W - MARGIN, 0.8);
    y -= 20;
  }

  let clipped = false;

  outer: for (const step of doc.steps) {
    if (y < BOTTOM + 40) {
      clipped = true;
      break;
    }
    text(MARGIN, y, "F2", 12, step.heading);
    y -= 16;

    for (const item of step.items) {
      if (y < BOTTOM + 24) {
        clipped = true;
        break outer;
      }
      const answer = (item.answer ?? "").trim();
      if (answer) {
        // Label and wrapped answer text
        text(MARGIN, y, "F2", 10, `${item.label}:`);
        y -= 13;
        for (const line of wrap(answer, 92)) {
          if (y < BOTTOM) {
            clipped = true;
            break outer;
          }
          text(MARGIN + 12, y, "F1", 10, line);
          y -= 13;
        }
        y -= 4;
      } else {
        // No answer yet — a labelled write-in line
        text(MARGIN, y, "F2", 10, `${item.label}:`);
        rule(MARGIN + 60, y - 2, PAGE_W - MARGIN, 0.5);
        y -= 18;
      }
    }
    y -= 8;
  }

  if (clipped) {
    text(MARGIN, BOTTOM - 14, "F1", 8, "…");
  }

  return assemblePdf(ops.join("\n"), images);
}

/** Decode a `data:image/jpeg;base64,…` URL to a binary (latin1) string,
 *  one character per byte, ready to embed as a PDF stream. */
function dataUrlToBinary(dataUrl) {
  const comma = dataUrl.indexOf(",");
  return atob(dataUrl.slice(comma + 1));
}

/**
 * Trigger a direct download of the blob (no print dialog).
 * @param {Blob} blob
 * @param {string} filename
 */
export function downloadPdf(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/* ---------- internals ---------- */

/** Escape PDF string delimiters. */
function escapeText(str) {
  return str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

/** Greedy word wrap by character count (~Helvetica 10pt fits ~95). */
function wrap(str, max) {
  const words = str.replace(/\s+/g, " ").split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    if (line && line.length + 1 + word.length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/**
 * Wrap a content stream into a complete one-page PDF file.
 * @param {string} content
 * @returns {Blob}
 */
function assemblePdf(content, images = []) {
  // Image XObjects are objects 7, 8, … — referenced from the page as /Im0, …
  const xobjRefs = images.map((_, i) => `/Im${i} ${7 + i} 0 R`).join(" ");
  const xobjRes = images.length ? ` /XObject << ${xobjRefs} >>` : "";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
      `/Resources << /Font << /F1 5 0 R /F2 6 0 R >>${xobjRes} >> /Contents 4 0 R >>`,
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];
  for (const im of images) {
    objects.push(
      `<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} ` +
        `/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.data.length} >>\n` +
        `stream\n${im.data}\nendstream`,
    );
  }

  let file = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(file.length);
    file += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = file.length;
  file += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    file += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  file += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  // One char = one byte: encode as WinAnsi (CP1252), '?' for the rest
  const bytes = new Uint8Array(file.length);
  for (let i = 0; i < file.length; i++) {
    const code = file.charCodeAt(i);
    bytes[i] = code <= 255 ? code : (CP1252_EXTRAS[code] ?? 63);
  }
  return new Blob([bytes], { type: "application/pdf" });
}

/* Common typographic chars that live above U+00FF but exist in
   WinAnsi — plus ASCII stand-ins for symbols that don't (★ → *). */
const CP1252_EXTRAS = {
  0x20ac: 128, // €
  0x2026: 133, // …
  0x2018: 145, // '
  0x2019: 146, // '
  0x201c: 147, // "
  0x201d: 148, // "
  0x2022: 149, // •
  0x2013: 150, // –
  0x2014: 151, // —
  0x201e: 132, // „
  0x2605: 42, // ★ → *
  0x00b7: 183, // · (already ≤255, listed for clarity)
};
