"use client";

import { useState } from "react";

type Mode = "all" | "range";
function bytesToPdfBlob(bytes: Uint8Array) {
  const safe = Uint8Array.from(bytes); // guarantees ArrayBuffer typing
  return new Blob([safe], { type: "application/pdf" });
}

export default function ToolClient() {
  const [file, setFile] = useState<File | null>(null);
  const [mode, setMode] = useState<Mode>("all");
  const [range, setRange] = useState("1-1");
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

  const parseRange = (input: string, max: number): number[] => {
    const [start, end] = input.split("-").map((n) => parseInt(n, 10));
    if (!start || !end || start > end) return [];
    const s = Math.max(1, start);
    const e = Math.min(max, end);
    return Array.from({ length: e - s + 1 }, (_, i) => s - 1 + i);
  };

  const handleSplit = async () => {
    if (!file) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const [{ PDFDocument }, JSZipMod] = await Promise.all([
          import("pdf-lib"),
          import("jszip"),
        ]);
        const JSZip = JSZipMod.default;

        const srcBytes = await file.arrayBuffer();
        const srcPdf = await PDFDocument.load(srcBytes);
        const totalPages = srcPdf.getPageCount();

        if (mode === "all") {
          const zip = new JSZip();

          for (let i = 0; i < totalPages; i++) {
            const outPdf = await PDFDocument.create();
            const [page] = await outPdf.copyPages(srcPdf, [i]);
            outPdf.addPage(page);
            const bytes = await outPdf.save();
            zip.file(`page-${i + 1}.pdf`, bytes);
          }

          const zipBlob = await zip.generateAsync({ type: "blob" });
          if (downloadUrl) URL.revokeObjectURL(downloadUrl);
          setDownloadUrl(URL.createObjectURL(zipBlob));
        } else {
          const pages = parseRange(range, totalPages);
          if (!pages.length) {
            alert("Invalid page range.");
            setStage("uploaded");
            return;
          }

          const outPdf = await PDFDocument.create();
          const copied = await outPdf.copyPages(srcPdf, pages);
          copied.forEach((p) => outPdf.addPage(p));

          const bytes = await outPdf.save();
          const blob = bytesToPdfBlob(bytes);

          if (downloadUrl) URL.revokeObjectURL(downloadUrl);
          setDownloadUrl(URL.createObjectURL(blob));
        }

        setStage("done");
      } catch (e) {
        console.error(e);
        alert("Failed to split PDF.");
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
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
          >
            <option value="all">Split all pages</option>
            <option value="range">Split page range</option>
          </select>

          {mode === "range" && (
            <input
              type="text"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="e.g. 2-5"
              className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
            />
          )}

          <button
            onClick={handleSplit}
            className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Split PDF
          </button>
        </>
      )}

      {(stage === "uploading" || stage === "processing") && (
        <>
          <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
            <div className="h-2 bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            {stage === "uploading" ? "Uploading PDF…" : "Splitting PDF…"}
          </p>
        </>
      )}

      {stage === "done" && downloadUrl && (
        <a
          href={downloadUrl}
          download={mode === "all" ? "split-pages.zip" : "split-range.pdf"}
          className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Download
        </a>
      )}
    </div>
  );
}
