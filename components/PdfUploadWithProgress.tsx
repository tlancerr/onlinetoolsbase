"use client";

import { useState } from "react";

interface PdfUploadWithProgressProps {
  onFileLoaded: (file: File) => void;
  maxSizeMB?: number;
}

export default function PdfUploadWithProgress({
  onFileLoaded,
  maxSizeMB = 50,
}: PdfUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFile(file: File) {
    setError("");

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`PDF size must be under ${maxSizeMB} MB.`);
      return;
    }

    setLoading(true);
    setProgress(0);

    // Simulated progress (realistic UX)
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.random() * 12;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          onFileLoaded(file);
        }, 300);
      }
      setProgress(Math.floor(percent));
    }, 120);
  }

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        className="tool-input"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {loading && (
        <div className="w-full">
          <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Uploading PDF… {progress}%
          </p>
        </div>
      )}
    </div>
  );
}
