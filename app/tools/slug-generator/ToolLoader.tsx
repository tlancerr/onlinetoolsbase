"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");

  function generate() {
    const s = input
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setSlug(s);
  }

  return (
    
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter title or text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Slug
        </button>

        {slug && (
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-slate-100 text-sm flex justify-between">
            <span>{slug}</span>
            <button
              className="text-blue-400 text-xs"
              onClick={() => navigator.clipboard.writeText(slug)}
            >
              Copy
            </button>
          </div>
        )}
      </div>
    
  );
}
