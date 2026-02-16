"use client";

import { useState } from "react";


const fonts = [
  (txt: string) => txt.toUpperCase(), // SIMPLE
  (txt: string) => "𝓣𝓱𝓲𝓼 𝓲𝓼 𝓯𝓪𝓷𝓬𝔂".replace(/./g, (_, i) => txt[i] || ""), // Example only
  (txt: string) =>
    txt
      .split("")
      .map((c) =>
        ({
          a: "𝒂",
          b: "𝒃",
          c: "𝒄",
          d: "𝒅",
          e: "𝒆",
          f: "𝒇",
          g: "𝒈",
          h: "𝒉",
          i: "𝒊",
          j: "𝒋",
          k: "𝒌",
          l: "𝒍",
          m: "𝒎",
          n: "𝒏",
          o: "𝒐",
          p: "𝒑",
          q: "𝒒",
          r: "𝒓",
          s: "𝒔",
          t: "𝒕",
          u: "𝒖",
          v: "𝒗",
          w: "𝒘",
          x: "𝒙",
          y: "𝒚",
          z: "𝒛",
        }[c.toLowerCase()] || c)
      )
      .join(""),
  (txt: string) =>
    txt
      .split("")
      .map((c) =>
        ({
          a: "𝔞",
          b: "𝔟",
          c: "𝔠",
          d: "𝔡",
          e: "𝔢",
          f: "𝔣",
          g: "𝔤",
          h: "𝔥",
          i: "𝔦",
          j: "𝔧",
          k: "𝔨",
          l: "𝔩",
          m: "𝔪",
          n: "𝔫",
          o: "𝔬",
          p: "𝔭",
          q: "𝔮",
          r: "𝔯",
          s: "𝔰",
          t: "𝔱",
          u: "𝔲",
          v: "𝔳",
          w: "𝔴",
          x: "𝔵",
          y: "𝔶",
          z: "𝔷",
        }[c.toLowerCase()] || c)
      )
      .join(""),
];

export default function ToolLoader() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<string[]>([]);

  function generate() {
    if (!text.trim()) return;
    setResults(fonts.map((f) => f(text)));
  }

  return (
    
      <div className="space-y-4">
        <textarea
          placeholder="Type something..."
          className="tool-input min-h-[100px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={generate}>
          Generate Fancy Fonts
        </button>

        <div className="space-y-3">
          {results.map((r, i) => (
            <div
              key={i}
              className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex justify-between text-sm text-slate-100"
            >
              <span>{r}</span>
              <button
                className="text-blue-400 text-xs"
                onClick={() => navigator.clipboard.writeText(r)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    
  );
}
