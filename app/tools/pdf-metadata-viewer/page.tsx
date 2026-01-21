"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";
import { PDFDocument } from "pdf-lib";

type Meta = {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  created?: string;
  modified?: string;
  pages?: number;
};

export default function PdfMetadataViewerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [stage, setStage] =
    useState<"idle" | "uploading" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [meta, setMeta] = useState<Meta | null>(null);

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
      setStage("processing");
      readMetadata(f);
    });
  };

  const readMetadata = async (f: File) => {
    try {
      const bytes = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);

      const info = pdfDoc.getTitle
        ? {
            title: pdfDoc.getTitle(),
            author: pdfDoc.getAuthor(),
            subject: pdfDoc.getSubject(),
            keywords: pdfDoc.getKeywords(),
            creator: pdfDoc.getCreator(),
            producer: pdfDoc.getProducer(),
            created: pdfDoc.getCreationDate()?.toISOString(),
            modified: pdfDoc.getModificationDate()?.toISOString(),
            pages: pdfDoc.getPageCount(),
          }
        : { pages: pdfDoc.getPageCount() };

      setMeta(info);
      setStage("done");
    } catch (e) {
      console.error(e);
      alert("Failed to read PDF metadata.");
      setStage("idle");
    }
  };

  return (
    <ToolLayout
      title="PDF Metadata Viewer"
      description="View detailed metadata information from a PDF file."
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
                : "Reading metadata…"}
            </p>
          </>
        )}

        {stage === "done" && meta && (
          <div className="text-sm text-slate-200 space-y-2">
            <p><strong>Title:</strong> {meta.title || "—"}</p>
            <p><strong>Author:</strong> {meta.author || "—"}</p>
            <p><strong>Subject:</strong> {meta.subject || "—"}</p>
            <p><strong>Keywords:</strong> {meta.keywords || "—"}</p>
            <p><strong>Creator:</strong> {meta.creator || "—"}</p>
            <p><strong>Producer:</strong> {meta.producer || "—"}</p>
            <p><strong>Created:</strong> {meta.created || "—"}</p>
            <p><strong>Modified:</strong> {meta.modified || "—"}</p>
            <p><strong>Pages:</strong> {meta.pages}</p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
