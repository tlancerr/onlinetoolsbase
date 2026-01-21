"use client";

import { useState } from "react";

export default function ToolClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [stage, setStage] =
    useState<"idle" | "uploading" | "uploaded" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
function bytesToPdfBlob(bytes: Uint8Array) {
  const safe = Uint8Array.from(bytes); // guarantees ArrayBuffer typing
  return new Blob([safe], { type: "application/pdf" });
}
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

  const handleUpload = (fileList: FileList) => {
    const pdfs = Array.from(fileList);
    if (!pdfs.length) return;

    setFiles(pdfs);
    setStage("uploading");
    simulateProgress(() => setStage("uploaded"));
  };

  const handleMerge = async () => {
    if (!files.length) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const { PDFDocument } = await import("pdf-lib");

        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
          const bytes = await file.arrayBuffer();
          const pdf = await PDFDocument.load(bytes);
          const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          pages.forEach((p) => mergedPdf.addPage(p));
        }


        const outBytes = await mergedPdf.save();
        const blob = bytesToPdfBlob(outBytes);



        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(URL.createObjectURL(blob));
        setStage("done");
      } catch (e) {
        console.error(e);
        alert("Failed to merge PDF files.");
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
          multiple
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
        />
      )}

      {(stage === "uploading" || stage === "processing") && (
        <>
          <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
            <div className="h-2 bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400">
            {stage === "uploading" ? "Uploading PDFs…" : "Merging PDFs…"}
          </p>
        </>
      )}

      {stage === "uploaded" && (
        <button
          onClick={handleMerge}
          className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Merge PDFs
        </button>
      )}

      {stage === "done" && downloadUrl && (
        <a
          href={downloadUrl}
          download="merged.pdf"
          className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Download Merged PDF
        </a>
      )}
    </div>
  );
}
