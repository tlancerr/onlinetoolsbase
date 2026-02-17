"use client";

import { useState } from "react";


const bioTemplates = [
  "{keyword} addict 💥🔥",
  "Making {keyword} simple 🎯",
  "Daily {keyword} vibes ✨",
  "{keyword} • Creator • Dreamer",
  "Turning {keyword} into magic 💫",
  "I do {keyword} so you don’t have to 😉",
  "{keyword} content almost daily 📍",
];

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [bios, setBios] = useState<string[]>([]);

  function generate() {
    if (!keyword.trim()) return;

    const out = bioTemplates.map((tpl) =>
      tpl.replace("{keyword}", keyword)
    );
    setBios(out);
  }

  return (
    
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter keyword (example: fitness, cooking)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Bios
        </button>

        <div className="space-y-3">
          {bios.map((bio, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm flex justify-between text-slate-100"
            >
              <span>{bio}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => navigator.clipboard.writeText(bio)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
  
  );
}
