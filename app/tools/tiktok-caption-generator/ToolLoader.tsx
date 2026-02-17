"use client";

import { useState } from "react";

const captionTemplates = [
  "POV: you're learning about {keyword} 👀✨",
  "Wait for it… {keyword} just changed everything 😳🔥",
  "{keyword} but make it aesthetic 🌸✨",
  "Low effort {keyword} content 🙌😂",
  "This is your sign to try {keyword} 💡💫",
  "Can we talk about how good {keyword} is?? 😍🔥",
  "{keyword} in 2025 just hits different 💥",
];

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);

  function generate() {
    if (!keyword.trim()) return;

    const out = captionTemplates.map((t) =>
      t.replace("{keyword}", keyword)
    );

    setCaptions(out);
  }

  return (
    
      <div className="space-y-4">
        <input
          className="tool-input"
          value={keyword}
          placeholder="Enter keyword (example: cooking, fitness)"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Captions
        </button>

        <div className="space-y-3">
          {captions.map((c, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm flex justify-between text-slate-100"
            >
              <span>{c}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => navigator.clipboard.writeText(c)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
   
  );
}
