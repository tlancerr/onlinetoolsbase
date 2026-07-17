"use client";

import { useState } from "react";

type Position = "footer-center" | "footer-right" | "header-right";
function bytesToPdfBlob(bytes: Uint8Array) {
  const safe = Uint8Array.from(bytes); // guarantees ArrayBuffer typing
  return new Blob([safe], { type: "application/pdf" });
}

export default function ToolClient() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<Position>("footer-center");
  const [stage, setStage] =
    useState<"idle" | "uploading" | "uploaded" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const simulateProgress = (onDone: () => void, speed = 40) => {
    setProgress(0);
    const interval = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(interval);
          onDone();
          return 100;
        }
        return p + 5;
      });
    }, speed);
  };

  const handleUpload = (f: File) => {
    setFile(f);
    setStage("uploading");
    simulateProgress(() => setStage("uploaded"));
  };

  const getCoords = (
    pos: Position,
    pageWidth: number,
    pageHeight: number,
    textWidth: number
  ) => {
    switch (pos) {
      case "footer-right":
        return { x: pageWidth - textWidth - 40, y: 30 };
      case "header-right":
        return { x: pageWidth - textWidth - 40, y: pageHeight - 40 };
      default:
        return { x: (pageWidth - textWidth) / 2, y: 30 };
    }
  };

  const handleNumbering = async () => {
    if (!file) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(bytes);
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const total = pages.length;
        const fontSize = 10;

        pages.forEach((page, index) => {
          const label = `${index + 1} / ${total}`;
          const textWidth = font.widthOfTextAtSize(label, fontSize);
          const { width, height } = page.getSize();
          const { x, y } = getCoords(position, width, height, textWidth);

          page.drawText(label, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(0.4, 0.4, 0.4),
          });
        });

        const out = await pdfDoc.save();
const blob = bytesToPdfBlob(out);


        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(URL.createObjectURL(blob));
        setStage("done");
      } catch (e) {
        console.error(e);
        alert("Failed to add page numbers.");
        setStage("uploaded");
      }
    }, 50);
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
      {stage === "idle" && (
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
        />
      )}

      {stage === "uploaded" && (
        <>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as Position)}
            className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
          >
            <option value="footer-center">Footer – Center</option>
            <option value="footer-right">Footer – Right</option>
            <option value="header-right">Header – Right</option>
          </select>

          <button
            onClick={handleNumbering}
            className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Add Page Numbers
          </button>
        </>
      )}

      {(stage === "uploading" || stage === "processing") && (
        <>
          <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
            <div className="h-2 bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            {stage === "uploading" ? "Uploading PDF…" : "Adding page numbers…"}
          </p>
        </>
      )}

      {stage === "done" && downloadUrl && (
        <a
          href={downloadUrl}
          download="page-numbered.pdf"
          className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Download Numbered PDF
        </a>
      )}
    </div>
  );
}
