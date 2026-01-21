"use client";

import { useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function ImageCropperPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  /* ---------- DRAW IMAGE ---------- */
  const drawImage = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    if (rect) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    }
  };

  /* ---------- UPLOAD ---------- */
  const handleUpload = (file: File) => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
      setRect(null);
      drawImage();
    };
    img.src = URL.createObjectURL(file);
  };

  /* ---------- MOUSE EVENTS ---------- */
  const onMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!start || !canvasRef.current) return;
    const r = canvasRef.current.getBoundingClientRect();

    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    setRect({
      x: start.x,
      y: start.y,
      w: x - start.x,
      h: y - start.y,
    });

    drawImage();
  };

  const onMouseUp = () => setStart(null);

  /* ---------- CROP ---------- */
  const cropAndDownload = () => {
    if (!rect || !canvasRef.current || !imgRef.current) return;

    const out = document.createElement("canvas");
    out.width = Math.abs(rect.w);
    out.height = Math.abs(rect.h);

    const ctx = out.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      rect.x,
      rect.y,
      rect.w,
      rect.h,
      0,
      0,
      out.width,
      out.height
    );

    out.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "cropped-image.jpg";
      a.click();
    }, "image/jpeg", 0.95);
  };

  return (
    <ToolLayout
      title="Image Cropper"
      description="Crop images to any size or aspect ratio quickly and easily."
      category="Image Tools"
    >
      {/* INNER TOOL BOX ONLY */}
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
        {!imageLoaded && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleUpload(e.target.files[0])
            }
            className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
          />
        )}

        {imageLoaded && (
          <>
            <canvas
              ref={canvasRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              className="w-full border border-slate-700 rounded cursor-crosshair"
            />

            <button
              onClick={cropAndDownload}
              className="w-full rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              Crop & Download
            </button>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
