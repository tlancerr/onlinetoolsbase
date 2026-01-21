"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function TweetThreadGenerator() {
  const [keyword, setKeyword] = useState("");
  const [threads, setThreads] = useState<string[]>([]);

  function generate() {
    if (!keyword.trim()) return;

    const out = [
      `1/ Let's talk about ${keyword}. Most people misunderstand this completely…`,
      `2/ The first thing to know about ${keyword} is that it's simpler than it looks.`,
      `3/ Here’s the biggest mistake people make with ${keyword}: they try to overcomplicate it.`,
      `4/ If you want to master ${keyword}, start small. Consistency beats intensity.`,
      `5/ The real secret is understanding how ${keyword} fits into your daily life.`,
      `6/ Final thoughts: ${keyword} is easier when you have the right tools. Keep learning. 🚀`,
    ];

    setThreads(out);
  }

  return (
    <ToolLayout
      title="Tweet Thread Generator"
      description="Create structured, viral-style tweet threads using a keyword."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter keyword (example: AI, motivation, fitness)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Thread
        </button>

        <div className="space-y-3">
          {threads.map((t, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm text-slate-100"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
