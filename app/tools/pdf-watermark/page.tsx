"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

export default function PdfWatermarkPage() {
  const [file, setFile] = useState<File | null>(null);
  const [watermark, setWatermark] = useState("CONFIDENTIAL");
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

  const handleWatermark = async () => {
    if (!file) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(bytes);
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const pages = pdfDoc.getPages();

        pages.forEach((page) => {
          const { width, height } = page.getSize();

          page.drawText(watermark, {
            x: width / 4,
            y: height / 2,
            size: 48,
            font,
            rotate: degrees(-30),
            color: rgb(0.75, 0.75, 0.75),
            opacity: 0.3,
          });
        });

        const out = await pdfDoc.save();
        const ab = out.slice().buffer; // ensures a real ArrayBuffer (not SharedArrayBuffer)
const blob = new Blob([ab], { type: "application/pdf" });
        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
        setDownloadUrl(URL.createObjectURL(blob));
        setStage("done");
      } catch (e) {
        console.error(e);
        alert("Failed to apply watermark.");
        setStage("uploaded");
      }
    }, 50);
  };

  return (
    <ToolLayout
      title="PDF Watermark"
      description="Add a text watermark to every page of a PDF file."
      category="PDF Tools"
    >
      {/* INNER TOOL BOX — unchanged layout */}
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
              type="text"
              value={watermark}
              onChange={(e) => setWatermark(e.target.value)}
              className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
              placeholder="Watermark text"
            />
            <button
              onClick={handleWatermark}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Apply Watermark
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
                : "Applying watermark…"}
            </p>
          </>
        )}

        {stage === "done" && downloadUrl && (
          <a
            href={downloadUrl}
            download="watermarked.pdf"
            className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            Download Watermarked PDF
          </a>
        )}
      </div>
    </ToolLayout>
  );
}
