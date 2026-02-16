"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [text, setText] = useState("");

  function removeBreaks() {
    const cleaned = text.replace(/[\r\n]+/g, " ");
    setText(cleaned);
  }

  return (
   
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={removeBreaks}>
          Remove Line Breaks
        </button>
      </div>
    
  );
}
