"use client";

import { useState } from "react";

const bioTemplates = [
  "{keyword} • Opinions are my own",
  "Sharing daily insights about {keyword} 📌",
  "Building in public | {keyword}",
  "{keyword} | Tweets ≠ financial advice 😂",
  "{keyword} enthusiast | Always learning",
  "I simplify {keyword} for everyone ✨",
  "Tweets about {keyword}, life & creativity 🧠",
];

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  function generate() {
    if (!keyword.trim()) return;

    setOutput(
      bioTemplates.map((t) =>
        t.replace("{keyword}", keyword.toLowerCase())
      )
    );
  }

  return (
    
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter keyword (example: AI, coding, fitness)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button onClick={generate} className="btn-primary w-full">
          Generate Bios
        </button>

        <div className="space-y-3">
          {output.map((bio, i) => (
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
