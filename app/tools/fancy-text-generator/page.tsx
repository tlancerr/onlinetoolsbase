"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

// Unicode maps for popular fancy fonts
import fancyFonts from "./fonts";

export default function FancyTextGenerator() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);

  function generate() {
    if (!input.trim()) return;

    const out = fancyFonts.map((map) =>
      input
        .split("")
        .map((c) => map[c] || c)
        .join("")
    );

    setResults(out);
  }

  return (
    <ToolLayout
      title="Fancy Text Generator"
      description="Convert text into 10+ stylish fancy fonts for Instagram, TikTok, Twitter, and more."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[100px]"
          placeholder="Enter text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Fancy Text
        </button>

        <div className="space-y-3">
          {results.map((txt, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm flex justify-between text-slate-100"
            >
              <span>{txt}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => navigator.clipboard.writeText(txt)}
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
