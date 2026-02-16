"use client";

import { useRef, useState } from "react";


export default function ToolLoader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [rotation, setRotation] = useState(0); // degrees
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const draw = () => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img) return;

    const angle = (rotation * Math.PI) / 180;

    const sin = Math.abs(Math.sin(angle));
    const cos = Math.abs(Math.cos(angle));
    const w = img.width;
    const h = img.height;

    const newW = Math.round(w * cos + h * sin);
    const newH = Math.round(w * sin + h * cos);

    canvas.width = newW;
    canvas.height = newH;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, newW, newH);
    ctx.translate(newW / 2, newH / 2);
    ctx.rotate(angle);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -w / 2, -h / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  const handleUpload = (file: File) => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      draw();
    };
    img.src = URL.createObjectURL(file);
  };

  const rotateLeft = () => {
    setRotation((r) => {
      const v = (r - 90) % 360;
      setTimeout(draw);
      return v;
    });
  };

  const rotateRight = () => {
    setRotation((r) => {
      const v = (r + 90) % 360;
      setTimeout(draw);
      return v;
    });
  };

  const toggleFlipH = () => {
    setFlipH((v) => {
      setTimeout(draw);
      return !v;
    });
  };

  const toggleFlipV = () => {
    setFlipV((v) => {
      setTimeout(draw);
      return !v;
    });
  };

  const download = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(
      (blob) => {
        if (!blob) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "rotated-image.jpg";
        a.click();
      },
      "image/jpeg",
      0.95
    );
  };

  return (
   
      
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
        {!loaded && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files && handleUpload(e.target.files[0])
            }
            className="block w-full text-sm file:mr-4 file:rounded file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
          />
        )}

        {loaded && (
          <>
            <canvas
              ref={canvasRef}
              className="w-full rounded border border-slate-700"
            />

            <div className="flex gap-2">
              <button
                onClick={rotateLeft}
                className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
              >
                Rotate Left
              </button>
              <button
                onClick={rotateRight}
                className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
              >
                Rotate Right
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={toggleFlipH}
                className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
              >
                Flip Horizontal
              </button>
              <button
                onClick={toggleFlipV}
                className="w-full rounded bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
              >
                Flip Vertical
              </button>
            </div>

            <button
              onClick={download}
              className="w-full rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              Download Image
            </button>
          </>
        )}
      </div>
   
  );
}
