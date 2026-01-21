"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

type OutputImage = {
  name: string;
  url: string;
};

type Preset = "custom" | "square" | "hd" | "fullhd";

export default function ImageResizerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [preset, setPreset] = useState<Preset>("custom");
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [keepRatio, setKeepRatio] = useState<boolean>(true);

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

  const applyPreset = (p: Preset) => {
    setPreset(p);
    if (p === "square") {
      setWidth(1080);
      setHeight(1080);
    } else if (p === "hd") {
      setWidth(1280);
      setHeight(720);
    } else if (p === "fullhd") {
      setWidth(1920);
      setHeight(1080);
    }
  };

  const handleUpload = (list: FileList) => {
    const imgs = Array.from(list);
    if (!imgs.length) return;

    setFiles(imgs);
    setStage("uploading");
    simulateProgress(() => setStage("uploaded"));
  };

  const resizeImage = (
    file: File,
    targetW: number,
    targetH: number
  ): Promise<OutputImage> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        let w = targetW;
        let h = targetH;

        if (keepRatio) {
          const ratio = img.width / img.height;
          if (targetW / targetH > ratio) {
            w = Math.round(targetH * ratio);
            h = targetH;
          } else {
            h = Math.round(targetW / ratio);
            w = targetW;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject();
          return;
        }

        ctx.drawImage(img, 0, 0, w, h);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject();
              return;
            }

            resolve({
              name: file.name.replace(
                /\.(png|jpg|jpeg|webp)$/i,
                `-${w}x${h}.jpg`
              ),
              url: URL.createObjectURL(blob),
            });
          },
          "image/jpeg",
          0.9
        );
      };

      img.onerror = reject;
      img.src = url;
    });

  const handleResize = async () => {
    if (!files.length) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const results: OutputImage[] = [];

        for (const file of files) {
          const out = await resizeImage(file, width, height);
          results.push(out);
        }

        setOutputs(results);
        setStage("done");
      } catch (e) {
        alert("Failed to resize images.");
        setStage("uploaded");
      }
    }, 45);
  };

  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to custom dimensions or preset sizes in seconds."
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
              value={preset}
              onChange={(e) => applyPreset(e.target.value as Preset)}
              className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
            >
              <option value="custom">Custom size</option>
              <option value="square">Square (1080×1080)</option>
              <option value="hd">HD (1280×720)</option>
              <option value="fullhd">Full HD (1920×1080)</option>
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
                placeholder="Width"
              />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-sm"
                placeholder="Height"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={keepRatio}
                onChange={(e) => setKeepRatio(e.target.checked)}
              />
              Keep aspect ratio
            </label>

            <button
              onClick={handleResize}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Resize Images
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
                : "Resizing images…"}
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
