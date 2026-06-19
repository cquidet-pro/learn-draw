import type { Animal, Level } from "../data/animals";
import { previewStrokes } from "../data/animals";

const SVG_NS = "http://www.w3.org/2000/svg";

const LEVEL_LABEL: Record<Level, string> = {
  5: "Easy",
  7: "Medium",
  10: "Harder",
};

/** Parse an SVG viewBox string ("minX minY width height") into numbers. */
function parseViewBox(viewBox: string): { w: number; h: number } {
  const parts = viewBox.trim().split(/[\s,]+/).map(Number);
  const w = parts[2] || 200;
  const h = parts[3] || 200;
  return { w, h };
}

/**
 * Build a detached <svg> showing the whole drawing as a plain black outline on
 * white — every stroke from every step, no color, ready to be colored in.
 */
function buildOutlineSvg(animal: Animal): SVGSVGElement {
  const { w, h } = parseViewBox(animal.viewBox);
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", animal.viewBox);
  svg.setAttribute("width", String(w));
  svg.setAttribute("height", String(h));

  // Stroke width scaled to the drawing's coordinate space so the outline reads
  // consistently whether the viewBox is 200 or 400 units wide.
  const strokeWidth = Math.max(w, h) / 80;

  for (const { d } of previewStrokes(animal)) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#000000");
    path.setAttribute("stroke-width", String(strokeWidth));
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
  }
  return svg;
}

/**
 * Generate and download a black-and-white coloring book PDF for the given
 * drawings: 6 drawings per A4 page, each the whole finished outline.
 */
export async function downloadColoringPdf(
  animals: Animal[],
  level: Level,
): Promise<void> {
  if (animals.length === 0) return;

  const [{ jsPDF }, { svg2pdf }] = await Promise.all([
    import("jspdf"),
    import("svg2pdf.js"),
  ]);

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  // A4 portrait layout: 2 columns x 3 rows = 6 drawings per page.
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 12;
  const cols = 2;
  const rows = 3;
  const titleH = 12; // space at the top for the page heading
  const gap = 8;
  const labelH = 7; // space under each drawing for its name

  const gridX = margin;
  const gridY = margin + titleH;
  const cellW = (pageW - 2 * margin - gap * (cols - 1)) / cols;
  const cellH = (pageH - gridY - margin - gap * (rows - 1)) / rows;
  const drawH = cellH - labelH; // area for the drawing itself

  // Off-screen host: svg2pdf reads computed styles, so the SVG must be attached.
  const host = document.createElement("div");
  host.style.position = "fixed";
  host.style.left = "-10000px";
  host.style.top = "0";
  document.body.appendChild(host);

  const perPage = cols * rows;
  try {
    for (let i = 0; i < animals.length; i++) {
      const animal = animals[i];
      const posOnPage = i % perPage;

      if (posOnPage === 0) {
        if (i > 0) doc.addPage();
        const pageNum = Math.floor(i / perPage) + 1;
        const pageCount = Math.ceil(animals.length / perPage);
        doc.setFontSize(16);
        doc.text(
          `Kidoo  ·  Color me! — ${LEVEL_LABEL[level]} drawings (page ${pageNum}/${pageCount})`,
          pageW / 2,
          margin + 6,
          { align: "center" },
        );
      }

      const col = posOnPage % cols;
      const row = Math.floor(posOnPage / cols);
      const cellX = gridX + col * (cellW + gap);
      const cellY = gridY + row * (cellH + gap);

      // Fit the drawing into the cell's draw area, preserving aspect ratio.
      const { w: vbW, h: vbH } = parseViewBox(animal.viewBox);
      const aspect = vbW / vbH;
      let w = cellW;
      let h = w / aspect;
      if (h > drawH) {
        h = drawH;
        w = h * aspect;
      }
      const x = cellX + (cellW - w) / 2;
      const y = cellY + (drawH - h) / 2;

      const svg = buildOutlineSvg(animal);
      host.appendChild(svg);
      await svg2pdf(svg, doc, { x, y, width: w, height: h });
      host.removeChild(svg);

      // Drawing name under each picture.
      doc.setFontSize(11);
      doc.text(animal.name, cellX + cellW / 2, cellY + cellH - 1, {
        align: "center",
      });
    }
  } finally {
    document.body.removeChild(host);
  }

  doc.save(`kidoo-coloring-${LEVEL_LABEL[level].toLowerCase()}.pdf`);
}
