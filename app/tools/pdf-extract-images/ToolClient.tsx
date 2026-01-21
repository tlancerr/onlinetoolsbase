"use client";

import { useState } from "react";

/**
 * Lazy-load pdfjs ONLY in browser
 */
let pdfjsLib: any = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;

  const mod: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
  mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

  pdfjsLib = mod;
  return mod;
}

export default function ToolClient() {
  const [file, setFile] = useState<File | null>(null);
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

  const handleExtract = async () => {
    if (!file) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const pdfjs = await loadPdfJs();
        const JSZip = (await import("jszip")).default;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;

        const zip = new JSZip();

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);

          await page.render({ canvasContext: ctx, viewport }).promise;

          const blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => resolve(b!), "image/png")
          );

          zip.file(`page-${i}.png`, blob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });

        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        const url = URL.createObjectURL(zipBlob);

        setDownloadUrl(url);
        setStage("done");
      } catch (err) {
        console.error(err);
        alert("Failed to extract images from PDF.");
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

      {(stage === "uploading" || stage === "processing") && (
        <>
          <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
            <div className="h-2 bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            {stage === "uploading" ? "Uploading PDF…" : "Extracting images…"}
          </p>
        </>
      )}

      {stage === "uploaded" && (
        <button
          onClick={handleExtract}
          className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Extract Images
        </button>
      )}

      {stage === "done" && downloadUrl && (
        <a
          href={downloadUrl}
          download="pdf-images.zip"
          className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Download Images (ZIP)
        </a>
      )}
    </div>
  );
}
