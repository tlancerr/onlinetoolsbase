"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

const styles = {
  aesthetic: [
    "🌿 {keyword} vibes only.",
    "✨ Collecting moments, not things. {keyword}",
    "🌙 Chasing dreams and {keyword}.",
  ],
  motivational: [
    "Believe in your {keyword} and make it happen.",
    "Success starts with {keyword}.",
    "Keep going. Your {keyword} is coming.",
  ],
  funny: [
    "I came, I saw, I {keyword} 😂",
    "Too glam to give a {keyword} 😎",
    "Powered by coffee and {keyword}.",
  ],
};

export default function InstagramCaptionGenerator() {
  const [keyword, setKeyword] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);

  function generate() {
    if (!keyword) {
      alert("Please enter a keyword");
      return;
    }

    const out: string[] = [];

    Object.values(styles).forEach((arr) => {
      arr.forEach((template) =>
        out.push(template.replace("{keyword}", keyword))
      );
    });

    setCaptions(out);
  }

  return (
    <ToolLayout
      title="Instagram Caption Generator"
      description="Generate creative, aesthetic, motivational, or funny captions for your Instagram posts."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter a keyword (example: travel, fitness, food)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Captions
        </button>

        <div className="space-y-3">
          {captions.map((c, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 flex justify-between"
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
    </ToolLayout>
  );
}
