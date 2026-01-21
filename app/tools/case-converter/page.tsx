"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function toSentenceCase(str: string) {
  const trimmed = str.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

export default function CaseConverter() {
  const [text, setText] = useState("");

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text into uppercase, lowercase, title case, and sentence case."
      category="Text Tools"
    >
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="btn-primary" onClick={() => setText(text.toUpperCase())}>
            UPPERCASE
          </button>

          <button className="btn-primary" onClick={() => setText(text.toLowerCase())}>
            lowercase
          </button>

          <button className="btn-primary" onClick={() => setText(toTitleCase(text))}>
            Title Case
          </button>

          <button className="btn-primary" onClick={() => setText(toSentenceCase(text))}>
            Sentence case
          </button>
        </div>
      </div>
    </ToolLayout>
  );
}
