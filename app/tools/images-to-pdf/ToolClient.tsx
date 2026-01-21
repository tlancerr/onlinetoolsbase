"use client";

import { useEffect, useMemo, useState } from "react";

function bytesToPdfBlob(bytes: Uint8Array) {
  const safe = Uint8Array.from(bytes);
  return new Blob([safe], { type: "application/pdf" });
}

// Convert unsupported images (e.g., webp/heic) to JPEG using canvas
async function fileToJpegArrayBuffer(file: File): Promise<ArrayBuffer> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error("Failed to decode image."));
    el.src = dataUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported.");
  ctx.drawImage(img, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode JPEG."))),
      "image/jpeg",
      0.92
    );
  });

  return await blob.arrayBuffer();
}

type Stage = "idle" | "uploaded" | "processing" | "done";

export default function ToolClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const hasFiles = files.length > 0;

  // Clean up object URL on unmount / re-generate
  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusText = useMemo(() => {
    if (stage === "processing") return "Creating PDF…";
    return "";
  }, [stage]);

  const handleUpload = (fileList: FileList) => {
    const imgs = Array.from(fileList || []);
    if (!imgs.length) return;

    // Revoke previous download if user uploads again
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    setFiles(imgs);
    setProgress(0);
    setStage("uploaded");
  };

  const handleConvert = async () => {
    if (!files.length) return;

    setStage("processing");
    setProgress(0);

    try {
      // heavy lib loads only when user clicks Convert
      const { PDFDocument } = await import("pdf-lib");

      const pdfDoc = await PDFDocument.create();

      const total = files.length;

      for (let i = 0; i < total; i++) {
        const file = files[i];
        const mime = (file.type || "").toLowerCase();

        // pdf-lib supports PNG + JPEG. Convert other formats to JPEG.
        let imgBytes: ArrayBuffer;
        let embedded;

        if (mime === "image/png") {
          imgBytes = await file.arrayBuffer();
          embedded = await pdfDoc.embedPng(imgBytes);
        } else if (mime === "image/jpeg" || mime === "image/jpg") {
          imgBytes = await file.arrayBuffer();
          embedded = await pdfDoc.embedJpg(imgBytes);
        } else {
          imgBytes = await fileToJpegArrayBuffer(file);
          embedded = await pdfDoc.embedJpg(imgBytes);
        }

        const page = pdfDoc.addPage([embedded.width, embedded.height]);
        page.drawImage(embedded, {
          x: 0,
          y: 0,
          width: embedded.width,
          height: embedded.height,
        });

        // Real progress (per image)
        const pct = Math.round(((i + 1) / total) * 100);
        setProgress(pct);

        // Optional TBT polish: yield between pages
        await new Promise((r) => setTimeout(r, 0));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = bytesToPdfBlob(pdfBytes);

      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(URL.createObjectURL(blob));
      setStage("done");
    } catch (e) {
      console.error(e);
      alert("Failed to convert images to PDF.");
      setStage("uploaded");
      setProgress(0);
    }
  };

  return (
    // INNER TOOL BOX ONLY (no layout redesign)
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
      {stage === "idle" && (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-[#64c1ff] file:px-4 file:py-2 file:text-slate-900 hover:file:opacity-90"
        />
      )}

      {stage === "uploaded" && (
        <button
          onClick={handleConvert}
          className="w-full rounded bg-[#64c1ff] px-4 py-2 text-sm text-slate-900 hover:opacity-90"
        >
          Convert Images to PDF
        </button>
      )}

      {stage === "processing" && (
        <>
          <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
            <div
              className="h-2 bg-[#64c1ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">
            {statusText} {progress}%
          </p>
        </>
      )}

      {stage === "done" && downloadUrl && (
        <a
          href={downloadUrl}
          download="images-to-pdf.pdf"
          className="block w-full text-center rounded bg-[#64c1ff] px-4 py-2 text-sm text-slate-900 hover:opacity-90"
        >
          Download PDF
        </a>
      )}

      {(stage === "uploaded" || stage === "done") && hasFiles && (
        <button
          onClick={() => {
            if (downloadUrl) URL.revokeObjectURL(downloadUrl);
            setDownloadUrl(null);
            setFiles([]);
            setProgress(0);
            setStage("idle");
          }}
          className="w-full rounded border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
        >
          Start Over
        </button>
      )}
    </div>
  );
}
