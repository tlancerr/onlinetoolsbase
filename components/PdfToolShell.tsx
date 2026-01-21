"use client";

import { useState } from "react";

type PdfToolShellProps = {
  title: string;
  actionLabel: string;
  processingText: string;
  onProcess: (file: File) => Promise<Blob>;
};

export default function PdfToolShell({
  title,
  actionLabel,
  processingText,
  onProcess,
}: PdfToolShellProps) {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] = useState<
    "idle" | "uploading" | "uploaded" | "processing" | "done"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleUpload = (f: File) => {
    setFile(f);
    setStage("uploading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStage("uploaded");
          return 100;
        }
        return p + 5;
      });
    }, 40);
  };

  const handleProcess = async () => {
    if (!file) return;

    setStage("processing");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + 3));
    }, 60);

    const result = await onProcess(file);

    clearInterval(interval);
    setProgress(100);

    const url = URL.createObjectURL(result);
    setDownloadUrl(url);
    setStage("done");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">{title}</h1>

      {stage === "idle" && (
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
        />
      )}

      {(stage === "uploading" || stage === "processing") && (
        <div>
          <div className="w-full h-2 bg-slate-700 rounded">
            <div
              className="h-2 bg-blue-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-2">
            {stage === "uploading" ? "Uploading PDF…" : processingText}
          </p>
        </div>
      )}

      {stage === "uploaded" && (
        <button
          onClick={handleProcess}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {actionLabel}
        </button>
      )}

      {stage === "done" && downloadUrl && (
        <a
          href={downloadUrl}
          download
          className="inline-block px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Result
        </a>
      )}
    </div>
  );
}
