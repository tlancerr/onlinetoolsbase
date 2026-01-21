"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function RemoveExtraSpaces() {
  const [text, setText] = useState("");

  function clean() {
    const cleaned = text.replace(/\s+/g, " ").trim();
    setText(cleaned);
  }

  return (
    <ToolLayout
      title="Remove Extra Spaces"
      description="Clean up extra spaces, tabs, and whitespace from text."
      category="Text Tools"
    >
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
    </ToolLayout>
  );
}
