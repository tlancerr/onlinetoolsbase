"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [text, setText] = useState("");

  function clean() {
    const cleaned = text.replace(/\s+/g, " ").trim();
    setText(cleaned);
  }

  return (
    
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={clean}>
          Remove Extra Spaces
        </button>
      </div>
   
  );
}
