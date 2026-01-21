"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

function capitalizeSentences(str: string) {
  return str
    .split(/([.?!]\s+)/)
    .map((segment) => {
      const s = segment.trim();
      if (!s.length) return segment;
      return s.charAt(0).toUpperCase() + s.slice(1);
    })
    .join("");
}

export default function CapitalizeSentences() {
  const [text, setText] = useState("");

  return (
    <ToolLayout
      title="Capitalize Sentences"
      description="Automatically capitalize the first letter of every sentence."
      category="Text Tools"
    >
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Paste text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="btn-primary w-full"
          onClick={() => setText(capitalizeSentences(text))}
        >
          Capitalize Sentences
        </button>
      </div>
    </ToolLayout>
  );
}
