"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

const templates = [
  "Top {keyword} Tips You Need to Know",
  "Why {keyword} Will Change Your Life",
  "I Tried {keyword}, Here’s What Happened",
  "The Ultimate {keyword} Guide",
  "5 Mistakes Everyone Makes With {keyword}",
  "How To Master {keyword} in 7 Days",
  "{keyword} Explained: Everything You Need To Know",
];

export default function YouTubeTitleGenerator() {
  const [keyword, setKeyword] = useState("");
  const [titles, setTitles] = useState<string[]>([]);

  function generate() {
    if (!keyword.trim()) return;
    setTitles(templates.map((t) => t.replace("{keyword}", keyword)));
  }

  return (
    <ToolLayout
      title="YouTube Title Generator"
      description="Generate compelling YouTube titles based on your keywords."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Keyword (example: Travel, AI, Fitness)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Titles
        </button>

        <div className="space-y-3">
          {titles.map((t, i) => (
            <div
              key={i}
              className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between text-sm"
            >
              <span>{t}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => navigator.clipboard.writeText(t)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
