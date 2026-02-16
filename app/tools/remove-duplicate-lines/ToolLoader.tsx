"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [text, setText] = useState("");

  function removeDuplicates() {
    const lines = text.split(/\r?\n/);
    const unique = Array.from(new Set(lines));
    setText(unique.join("\n"));
  }

  return (
    
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Paste text with duplicates..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={removeDuplicates}>
          Remove Duplicate Lines
        </button>
      </div>

  );
}
