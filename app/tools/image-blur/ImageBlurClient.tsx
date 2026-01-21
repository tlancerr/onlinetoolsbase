"use client";

import { useEffect, useRef, useState } from "react";

type OutputImage = {
  name: string;
  url: string;
};

export default function ImageBlurClient() {
  const [files, setFiles] = useState<File[]>([]);
  const [blur, setBlur] = useState(8);
  const [outputs, setOutputs] = useState<OutputImage[]>([]);
  const [stage, setStage] =
    useState<"idle" | "uploaded" | "processing" | "done">("idle");
  const [progress, setProgress] = useState(0);

  // Preview
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  /* ---------- LIVE PREVIEW EFFECT ---------- */
  useEffect(() => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = imgRef.current.width;
    canvas.height = imgRef.current.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `blur(${blur}px)`;
    ctx.drawImage(imgRef.current, 0, 0);
    ctx.filter = "none";
  }, [blur]);

  const handleUpload = (list: FileList) => {
    const imgs = Array.from(list);
    if (!imgs.length) return;

    setFiles(imgs);
    setStage("uploaded");

    const previewImg = new Image();
    previewImg.onload = () => {
      imgRef.current = previewImg;
      setBlur(8);
    };
    previewImg.src = URL.createObjectURL(imgs[0]);
  };

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

  const blurImage = (file: File): Promise<OutputImage> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject();

        ctx.filter = `blur(${blur}px)`;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject();

            resolve({
              name: file.name.replace(
                /\.(png|jpg|jpeg|webp)$/i,
                "-blurred.jpg"
              ),
              url: URL.createObjectURL(blob),
            });
          },
          "image/jpeg",
          0.9
        );
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });

  const handleExport = async () => {
    if (!files.length) return;

    setStage("processing");

    simulateProgress(async () => {
      try {
        const results: OutputImage[] = [];
        for (const file of files) {
          results.push(await blurImage(file));
        }
        setOutputs(results);
        setStage("done");
      } catch {
        alert("Failed to blur images.");
        setStage("uploaded");
      }
    });
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
      {stage === "idle" && (
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            e.target.files && handleUpload(e.target.files)
          }
          className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-[#64c1ff] file:px-4 file:py-2 file:text-white"
        />
      )}

      {stage === "uploaded" && (
        <>
          <canvas
            ref={canvasRef}
            className="w-full rounded border border-slate-700"
          />

          <label className="block text-sm text-slate-300">
            Blur strength: {blur}px
          </label>
          <input
            type="range"
            min={0}
            max={30}
            value={blur}
            onChange={(e) => setBlur(Number(e.target.value))}
            className="w-full"
          />

          <button
            onClick={handleExport}
            className="w-full rounded bg-[#64c1ff] px-4 py-2 text-sm text-white"
          >
            Apply & Download
          </button>
        </>
      )}

      {stage === "processing" && (
        <>
          <div className="h-2 w-full rounded bg-slate-700 overflow-hidden">
            <div
              className="h-2 bg-[#64c1ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-slate-400">Processing images…</p>
        </>
      )}

      {stage === "done" && (
        <div className="space-y-3">
          {outputs.map((o, i) => (
            <a
              key={i}
              href={o.url}
              download={o.name}
              className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white"
            >
              Download {o.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
