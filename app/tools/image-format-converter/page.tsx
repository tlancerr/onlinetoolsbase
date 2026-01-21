"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type OutputImage = {
  name: string;
  url: string;
};

type Format = "jpeg" | "png" | "webp";

export default function ImageFormatConverterPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<Format>("jpeg");
  const [outputs, setOutputs] = useState<OutputImage[]>([]);
  const [stage, setStage] =
    useState<"idle" | "uploading" | "uploaded" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const simulateProgress = (onDone: () => void, speed = 35) => {
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

  const handleUpload = (list: FileList) => {
    const imgs = Array.from(list);
    if (!imgs.length) return;

    setFiles(imgs);
    setStage("uploading");
    simulateProgress(() => setStage("uploaded"));
  };

  const convertImage = (file: File): Promise<OutputImage> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const src = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject();
          return;
        }

        ctx.drawImage(img, 0, 0);

        const mime =
          format === "png"
            ? "image/png"
            : format === "webp"
            ? "image/webp"
            : "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject();
              return;
            }

            resolve({
              name: file.name.replace(/\.\w+$/, `.${format}`),
              url: URL.createObjectURL(blob),
            });
          },
          mime,
          format === "jpeg" ? 0.9 : undefined
        );
      };

      img.onerror = reject;
      img.src = src;
    });

  const handleConvert = async () => {
    if (!files.length) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const results: OutputImage[] = [];

        for (const file of files) {
          const out = await convertImage(file);
          results.push(out);
        }

        setOutputs(results);
        setStage("done");
      } catch (e) {
        alert("Failed to convert images.");
        setStage("uploaded");
      }
    }, 45);
  };

  return (
    <ToolLayout
      title="Image Format Converter"
      description="Convert images between JPG, PNG, WEBP and other formats."
      category="Image Tools"
    >
      {/* INNER TOOL BOX ONLY */}
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
        {stage === "idle" && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              e.target.files && handleUpload(e.target.files)
            }
            className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
          />
        )}

        {stage === "uploaded" && (
          <>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as Format)}
              className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
            >
              <option value="jpeg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
            </select>

            <button
              onClick={handleConvert}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Convert Images
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
                ? "Uploading images…"
                : "Converting images…"}
            </p>
          </>
        )}

        {stage === "done" && (
          <div className="space-y-3">
            {outputs.map((o, i) => (
              <a
                key={i}
                href={o.url}
                download={o.name}
                className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
              >
                Download {o.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
