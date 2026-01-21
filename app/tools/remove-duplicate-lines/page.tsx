"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function RemoveDuplicateLines() {
  const [text, setText] = useState("");

  function removeDuplicates() {
    const lines = text.split(/\r?\n/);
    const unique = Array.from(new Set(lines));
    setText(unique.join("\n"));
  }

  return (
    <ToolLayout
      title="Remove Duplicate Lines"
      description="Automatically remove repeated lines from any text."
      category="Text Tools"
    >
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
    </ToolLayout>
  );
}
