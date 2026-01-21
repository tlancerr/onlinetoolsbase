"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

const sets: Record<string, string[]> = {
  travel: [
    "#travel #wanderlust #vacation #explore #adventure #nature #traveldiaries",
  ],
  fitness: [
    "#fitness #gym #workout #fitlife #health #motivation #fitspo #gains",
  ],
  food: ["#food #foodie #yum #delicious #foodlover #instafood"],
  photography: ["#photography #photooftheday #picoftheday #naturephotography"],
  fashion: ["#fashion #style #ootd #model #streetstyle #fashionblogger"],
};

export default function InstagramHashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<string[]>([]);

  function generate() {
    const key = keyword.toLowerCase();

    if (sets[key]) {
      setResult(sets[key]);
    } else {
      setResult([
        `#${key} #insta${key} #love #photooftheday #instagood #followme`,
      ]);
    }
  }

  return (
    <ToolLayout
      title="Instagram Hashtag Generator"
      description="Generate popular Instagram hashtags for any niche."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter niche (travel, food, fitness, etc.)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Hashtags
        </button>

        <div className="space-y-3">
          {result.map((set, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 flex justify-between"
            >
              <span>{set}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => navigator.clipboard.writeText(set)}
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
