"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function TextSorter() {
  const [text, setText] = useState("");

  const lines = text.split(/\r?\n/);

  function sortAZ() {
    setText(lines.sort((a, b) => a.localeCompare(b)).join("\n"));
  }

  function sortZA() {
    setText(lines.sort((a, b) => b.localeCompare(a)).join("\n"));
  }

  function sortByLength() {
    setText(lines.sort((a, b) => a.length - b.length).join("\n"));
  }

  function removeDuplicates() {
    setText(Array.from(new Set(lines)).join("\n"));
  }

  return (
    <ToolLayout
      title="Text Sorter"
      description="Sort text lines alphabetically or by length, and remove duplicates."
      category="Text Tools"
    >
      <div className="space-y-4">

        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Enter lines of text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="btn-primary" onClick={sortAZ}>A → Z</button>
          <button className="btn-primary" onClick={sortZA}>Z → A</button>
          <button className="btn-primary" onClick={sortByLength}>Sort by Length</button>
          <button className="btn-primary" onClick={removeDuplicates}>Remove Duplicates</button>
        </div>

      </div>
    </ToolLayout>
  );
}
