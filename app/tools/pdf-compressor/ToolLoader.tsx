"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] =
    useState<"idle" | "uploading" | "uploaded" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  /* ---------- helpers ---------- */
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

  /* ---------- upload ---------- */
  const handleUpload = (f: File) => {
    setFile(f);
    setStage("uploading");

    simulateProgress(() => {
      setStage("uploaded");
    });
  };

  /* ---------- compress ---------- */
  const handleCompress = async () => {
    if (!file) return;

    setStage("processing");

    simulateProgress(async () => {
      // TEMP: return same file (real compression later)
      const buffer = await file.arrayBuffer();
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setDownloadUrl(url);
      setStage("done");
    }, 60);
  };

  return (
    
      {/* ================= TOOL BOX ================= */}
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
        {/* IDLE */}
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

        {/* PROGRESS */}
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
                : "Optimizing PDF…"}
            </p>
          </>
        )}

        {/* ACTION */}
        {stage === "uploaded" && (
          <button
            onClick={handleCompress}
            className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Compress PDF
          </button>
        )}

        {/* DOWNLOAD */}
        {stage === "done" && downloadUrl && (
          <a
            href={downloadUrl}
            download
            className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            Download Compressed PDF
          </a>
        )}
      </div>
      {/* ================= END TOOL BOX ================= */}
   
  );
}
