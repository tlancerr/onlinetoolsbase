"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

const hashtagSets: Record<string, string[]> = {
  fitness: [
    "#fitness #gym #tiktokfitness #fitlife #workout #fitnessmotivation #gymtok #health",
  ],
  cooking: [
    "#cooking #foodtok #recipe #chef #tiktokfood #yummy #homemade #foodie",
  ],
  travel: [
    "#travel #traveltok #wanderlust #vacation #explore #adventure #traveldiaries",
  ],
  fashion: [
    "#fashion #style #ootd #tiktokfashion #streetwear #model #styleinspo",
  ],
  beauty: [
    "#beauty #makeup #skincare #beautytok #glam #selfcare #makeuptutorial",
  ],
};

export default function TikTokHashtagGenerator() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<string[]>([]);

  function generate() {
    const key = keyword.toLowerCase();

    if (hashtagSets[key]) {
      setResult(hashtagSets[key]);
    } else {
      setResult([
        `#${key} #${key}tok #viral #fyp #trend #tiktok #tiktokchallenge`,
      ]);
    }
  }

  return (
    <ToolLayout
      title="TikTok Hashtag Generator"
      description="Generate trending TikTok hashtags for any niche."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Enter niche (fitness, cooking, travel, etc.)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Hashtags
        </button>

        <div className="space-y-3">
          {result.map((tagSet, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 flex justify-between"
            >
              <span>{tagSet}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => navigator.clipboard.writeText(tagSet)}
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
