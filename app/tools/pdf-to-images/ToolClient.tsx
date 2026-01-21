"use client";

import { useState } from "react";

/* ========= Safe PDFJS Loader ========= */
let pdfjsLib: any = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;

  // pdfjs-dist v5 compatible path:
  const mod: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
  mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

  pdfjsLib = mod;
  return mod;
}

type PageImage = {
  page: number;
  url: string;
};

export default function ToolClient() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<PageImage[]>([]);
  const [stage, setStage] =
    useState<"idle" | "uploading" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const simulateProgress = (onDone: () => void, speed = 30) => {
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
    simulateProgress(() => {
      void processPdf(f);
    });
  };

  const processPdf = async (f: File) => {
    setStage("processing");

    try {
      const pdfjs = await loadPdfJs();
      const buffer = await f.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: buffer }).promise;

      const results: PageImage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context not available.");

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        const url = canvas.toDataURL("image/png");
        results.push({ page: i, url });
      }

      setImages(results);
      setStage("done");
    } catch (e) {
      console.error(e);
      alert("Failed to convert PDF to images.");
      setStage("idle");
    }
  };

  const downloadImage = (url: string, page: number) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${page}.png`;
    a.click();
  };

  return (
    <>
      {/* INNER TOOL BOX ONLY */}
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
        {stage === "idle" && (
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
            className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
          />
        )}

        {(stage === "uploading" || stage === "processing") && (
          <>
            <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
              <div
                className="h-2 bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              {stage === "uploading" ? "Uploading PDF…" : "Rendering pages…"}
            </p>
          </>
        )}

        {stage === "done" && (
          <div className="space-y-6">
            {images.map((img) => (
              <div
                key={img.page}
                className="border border-slate-700 rounded p-3"
              >
                <img
                  src={img.url}
                  alt={`Page ${img.page}`}
                  className="w-full rounded mb-2"
                />
                <button
                  onClick={() => downloadImage(img.url, img.page)}
                  className="w-full rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                  Download Page {img.page}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
