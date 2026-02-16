"use client";

import { useState } from "react";


export type Frequency = Record<string, number>;

export default function ToolLoader() {
  const [text, setText] = useState("");
  const [freq, setFreq] = useState<Frequency>({});

  function analyze() {
    const map: Frequency = {};
    for (const char of text) {
      map[char] = (map[char] || 0) + 1;
    }
    setFreq(map);
  }

  return (
    
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={analyze}>
          Count Characters
        </button>

        {Object.keys(freq).length > 0 && (
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg text-slate-100 text-sm space-y-1 max-h-[300px] overflow-auto">
            {Object.entries(freq).map(([char, count]) => (
              <p key={char}>
                <strong>{char === " " ? "[space]" : char}:</strong> {count}
              </p>
            ))}
          </div>
        )}
      </div>
    
  );
}
