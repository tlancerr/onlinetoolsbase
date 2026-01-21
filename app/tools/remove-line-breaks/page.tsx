"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function RemoveLineBreaks() {
  const [text, setText] = useState("");

  function removeBreaks() {
    const cleaned = text.replace(/[\r\n]+/g, " ");
    setText(cleaned);
  }

  return (
    <ToolLayout
      title="Remove Line Breaks"
      description="Remove all line breaks and merge text into one line."
      category="Text Tools"
    >
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
    </ToolLayout>
  );
}
