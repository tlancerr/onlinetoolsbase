"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function TwitterHashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  function generate() {
    if (!keyword.trim()) return;
    const k = keyword.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");

    const out = [
      `#${k}`,
      `#${k}Tips`,
      `#${k}Twitter`,
      `#${k}Community`,
      `#${k}Experts`,
      `#${k}Guide`,
      `#${k}X`,
      `#${k}Insights`,
      `#${k}News`,
      `#${k}Daily`,
      `#${k}Thread`,
      `#Trending #Viral #FYP`,
    ];

    setTags(out);
  }

  return (
    <ToolLayout
      title="Twitter Hashtag Generator"
      description="Generate trending-style hashtags for Twitter / X posts."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter keyword (example: crypto, fitness)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button onClick={generate} className="btn-primary w-full">
          Generate Hashtags
        </button>

        <div className="space-y-3">
          {tags.map((t, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm flex justify-between text-slate-100"
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
