"use client";

import { useRef, useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function ImageColorPickerPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [hex, setHex] = useState("#000000");
  const [rgb, setRgb] = useState("rgb(0, 0, 0)");
  const [hsl, setHsl] = useState("hsl(0, 0%, 0%)");

  /* ---------- DRAW IMAGE SAFELY ---------- */
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
  };

  /* ---------- UPLOAD ---------- */
  const handleUpload = (file: File) => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);

      // Ensure canvas exists before drawing
      requestAnimationFrame(drawImage);
    };
    img.src = URL.createObjectURL(file);
  };

  /* ---------- RESET / REUPLOAD ---------- */
  const reset = () => {
    setLoaded(false);
    imgRef.current = null;
    setHex("#000000");
    setRgb("rgb(0, 0, 0)");
    setHsl("hsl(0, 0%, 0%)");
  };

  /* ---------- COLOR CONVERSION ---------- */
  const rgbToHex = (r: number, g: number, b: number) =>
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(
      s * 100
    )}%, ${Math.round(l * 100)}%)`;
  };

  /* ---------- PICK COLOR ---------- */
  const pickColor = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data;

    setHex(rgbToHex(r, g, b));
    setRgb(`rgb(${r}, ${g}, ${b})`);
    setHsl(rgbToHsl(r, g, b));
  };

  return (
    <ToolLayout
      title="Image Color Picker"
      description="Pick color codes from any image, including HEX, RGB and HSL."
      category="Image Tools"
    >
      {/* INNER TOOL BOX ONLY */}
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
              onClick={pickColor}
              className="w-full border border-slate-700 rounded cursor-crosshair"
            />

            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-6 w-6 rounded border"
                  style={{ backgroundColor: hex }}
                />
                <strong>{hex}</strong>
              </div>

              <div>
                <span className="text-slate-300">RGB:</span> {rgb}
              </div>

              <div>
                <span className="text-slate-300">HSL:</span> {hsl}
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full rounded bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
            >
              Change Image
            </button>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
