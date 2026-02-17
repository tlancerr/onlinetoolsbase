"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [text, setText] = useState("");

  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const characters = text.length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  return (
    
      <div className="space-y-4">

        <textarea
          className="tool-input h-48"
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-emerald-300 space-y-2">
          <p>Words: {words}</p>
          <p>Characters: {characters}</p>
          <p>Sentences: {sentences}</p>
        </div>

      </div>
  );
}
