"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const convert = () => {
    if (!input.startsWith("data:image")) {
      alert("Invalid Base64 image string.");
      return;
    }
    setImageUrl(input);
  };

  const reset = () => {
    setInput("");
    setImageUrl(null);
  };

  return (
    
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 space-y-4">
        {!imageUrl && (
          <>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste Base64 image string here..."
              rows={6}
              className="w-full rounded bg-slate-800 border border-slate-600 p-2 text-xs text-slate-200"
            />

            <button
              onClick={convert}
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              Convert to Image
            </button>
          </>
        )}

        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt="Converted"
              className="w-full rounded border border-slate-700"
            />

            <a
              href={imageUrl}
              download="image-from-base64.png"
              className="block w-full text-center rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
            >
              Download Image
            </a>

            <button
              onClick={reset}
              className="w-full rounded bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
            >
              Convert Another
            </button>
          </>
        )}
      </div>
    
  );
}
