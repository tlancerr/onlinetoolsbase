"use client";

import { useState } from "react";


const templates = [
  "{keyword} • Dreamer ✨ | Believer 💫 | Achiever 🚀",
  "Sharing my {keyword} journey 🌍",
  "{keyword}. Creating. Inspiring. Growing.",
  "{keyword} enthusiast | Spreading positivity ✨",
  "Turning {keyword} into lifestyle 💎",
];

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [bios, setBios] = useState<string[]>([]);

  function generate() {
    if (!keyword) {
      alert("Please enter a keyword.");
      return;
    }

    const results = templates.map((t) =>
      t.replace("{keyword}", keyword.toLowerCase())
    );

    setBios(results);
  }

  return (
    
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter keyword (travel, fitness, photography...)"
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
              className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 flex justify-between"
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
