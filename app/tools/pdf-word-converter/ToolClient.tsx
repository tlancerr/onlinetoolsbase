"use client";

import { useState } from "react";
function bytesToPdfBlob(bytes: Uint8Array) {
  const safe = Uint8Array.from(bytes); // guarantees ArrayBuffer typing
  return new Blob([safe], { type: "application/pdf" });
}

/* ================= PDFJS LOADER ================= */
function extractCleanTextFromDocxXml(xml: string): string {
  const matches = xml.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g);
  const lines: string[] = [];

  for (const m of matches) {
    let text = m[1];
    text = text.replace(/<[^>]+>/g, "");
    text = text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    text = text.trim();
    if (text) lines.push(text);
  }

  return lines.join("\n\n");
}

let pdfjsLib: any = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  const mod: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
  mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
  pdfjsLib = mod;
  return mod;
}

/* ================= DOCX FROM TEXT ================= */
async function createDocxFromText(text: string): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  zip.folder("_rels");
  zip.folder("word");
  zip.folder("word/_rels");

  const safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml"
 ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
  );

  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1"
 Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"
 Target="word/document.xml"/>
</Relationships>`
  );

  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
${safeText
  .split("\n")
  .map((l) => `<w:p><w:r><w:t>${l || " "}</w:t></w:r></w:p>`)
  .join("")}
</w:body>
</w:document>`
  );

  zip.file(
    "word/_rels/document.xml.rels",
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>`
  );

  return zip.generateAsync({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}

/* ================= PDF FROM TEXT ================= */
async function createPdfFromText(text: string): Promise<Blob> {
  const { PDFDocument, StandardFonts } = await import("pdf-lib");

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const fontSize = 11;
  const lineHeight = 14;
  const margin = 40;

  let page = pdf.addPage();
  let { width, height } = page.getSize();
  let y = height - margin;

  const words = text.split(/\s+/);
  let line = "";

  for (const word of words) {
    const testLine = line + word + " ";
    const textWidth = font.widthOfTextAtSize(testLine, fontSize);

    if (textWidth > width - margin * 2) {
      if (y < margin) {
        page = pdf.addPage();
        ({ width, height } = page.getSize());
        y = height - margin;
      }

      page.drawText(line.trim(), { x: margin, y, size: fontSize, font });
      y -= lineHeight;
      line = word + " ";
    } else {
      line = testLine;
    }
  }

  if (line.trim()) {
    if (y < margin) {
      page = pdf.addPage();
      ({ width, height } = page.getSize());
      y = height - margin;
    }
    page.drawText(line.trim(), { x: margin, y, size: fontSize, font });
  }

    const bytes = await pdf.save();
  return bytesToPdfBlob(bytes);

}

/* ================= COMPONENT ================= */
export default function ToolClient() {
  const [mode, setMode] = useState<"pdf2word" | "word2pdf">("pdf2word");
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] =
    useState<"idle" | "uploading" | "uploaded" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const simulate = (cb: () => void, speed = 35) => {
    setProgress(0);
    const i = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(i);
          cb();
          return 100;
        }
        return p + 5;
      });
    }, speed);
  };

  const handleUpload = (f: File) => {
    setFile(f);
    setStage("uploading");
    simulate(() => setStage("uploaded"));
  };

  const handleConvert = async () => {
    if (!file) return;
    setStage("processing");

    simulate(async () => {
      try {
        if (mode === "pdf2word") {
          const pdfjs = await loadPdfJs();
          const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;

          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += "\n\n" + content.items.map((it: any) => it.str).join(" ");
          }

          const docx = await createDocxFromText(text.trim());
          setDownloadUrl(URL.createObjectURL(docx));
        } else {
          const JSZip = (await import("jszip")).default;
          const zip = await JSZip.loadAsync(await file.arrayBuffer());
          const xml = await zip.file("word/document.xml")!.async("text");
          const text = extractCleanTextFromDocxXml(xml);

          const pdf = await createPdfFromText(text.trim());
          setDownloadUrl(URL.createObjectURL(pdf));
        }

        setStage("done");
      } catch (e) {
        console.error(e);
        alert("Conversion failed.");
        setStage("uploaded");
      }
    });
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as "pdf2word" | "word2pdf")}
        className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
      >
        <option value="pdf2word">PDF to Word</option>
        <option value="word2pdf">Word to PDF</option>
      </select>

      {stage === "idle" && (
        <input
          type="file"
          accept={mode === "pdf2word" ? "application/pdf" : ".docx"}
          onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
        />
      )}

      {(stage === "uploading" || stage === "processing") && (
        <>
          <div className="h-2 bg-slate-700 rounded overflow-hidden">
            <div className="h-2 bg-blue-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            {stage === "uploading" ? "Uploading…" : "Converting…"}
          </p>
        </>
      )}

      {stage === "uploaded" && (
        <button
          onClick={handleConvert}
          className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Convert
        </button>
      )}

      {stage === "done" && downloadUrl && (
        <a
          href={downloadUrl}
          download={mode === "pdf2word" ? "pdf-to-word.docx" : "word-to-pdf.pdf"}
          className="block text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Download File
        </a>
      )}
    </div>
  );
}
