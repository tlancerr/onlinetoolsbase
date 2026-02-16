"use client";

import { useState } from "react";


/**
 * Lazy-load pdfjs safely (Next.js App Router compatible)
 */
let pdfjsLib: any = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;

  const mod = await import("pdfjs-dist/legacy/build/pdf.mjs");
  mod.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

  pdfjsLib = mod;
  return mod;
}

export default function ToolLoader() {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] =
    useState<"idle" | "uploading" | "uploaded" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const simulateProgress = (onDone: () => void, speed = 40) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
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
      setStage("uploaded");
    });
  };

  const handleConvert = async () => {
    if (!file) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const pdfjs = await loadPdfJs();
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: buffer }).promise;

        let textOutput = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();

          const pageText = content.items
            .map((item: any) => item.str)
            .join(" ");

          textOutput += `\n\n--- Page ${i} ---\n\n${pageText}`;
        }

        const blob = new Blob([textOutput.trim()], {
          type: "text/plain",
        });

        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        const url = URL.createObjectURL(blob);

        setDownloadUrl(url);
        setStage("done");
      } catch (err) {
        console.error(err);
        alert("Failed to convert PDF to text.");
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
            onChange={(e) =>
              e.target.files && handleUpload(e.target.files[0])
            }
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
              {stage === "uploading"
                ? "Uploading PDF…"
                : "Converting to text…"}
            </p>
          </>
        )}

        {stage === "uploaded" && (
          <button
            onClick={handleConvert}
            className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Convert to Text
          </button>
        )}

        {stage === "done" && downloadUrl && (
          <a
            href={downloadUrl}
            download="pdf-to-text.txt"
            className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            Download Text File
          </a>
        )}
      </div>
    
  );
}
