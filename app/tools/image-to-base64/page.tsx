"use client";

import { useState } from "react";
import ToolLayout from "@/components/ToolLayout";

export default function ImageToBase64Page() {
  const [base64, setBase64] = useState("");
  const [loaded, setLoaded] = useState(false);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result as string);
      setLoaded(true);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setBase64("");
    setLoaded(false);
  };

  return (
    <ToolLayout
      title="Image to Base64 Converter"
      description="Convert images into Base64 encoded strings within seconds."
      category="Image Tools"
    >
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
            <textarea
              value={base64}
              readOnly
              rows={8}
              className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-xs text-slate-200"
            />

            <button
              onClick={() => navigator.clipboard.writeText(base64)}
              className="w-full rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              Copy Base64
            </button>

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
