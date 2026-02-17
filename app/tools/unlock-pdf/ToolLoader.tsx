"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
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
    simulateProgress(() => setStage("uploaded"));
  };

  const handleUnlock = async () => {
    if (!file) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        // Placeholder behavior: return original PDF
        const blob = new Blob([await file.arrayBuffer()], {
          type: "application/pdf",
        });

        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(URL.createObjectURL(blob));
        setStage("done");
      } catch (e) {
        console.error(e);
        alert("Failed to unlock PDF.");
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

        {stage === "uploaded" && (
          <>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter PDF password"
              className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
            />
            <p className="text-xs text-slate-400">
              PDF unlocking will be fully enabled after launch using secure
              server-side processing.
            </p>
            <button
              onClick={handleUnlock}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Unlock PDF
            </button>
          </>
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
                : "Processing…"}
            </p>
          </>
        )}

        {stage === "done" && downloadUrl && (
          <a
            href={downloadUrl}
            download="unlocked.pdf"
            className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            Download PDF
          </a>
        )}
      </div>
    
  );
}
