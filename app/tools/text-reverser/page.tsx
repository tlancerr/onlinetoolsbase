"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function TextReverser() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("full");

  function reverseFull(str: string) {
    return str.split("").reverse().join("");
  }

  function reverseWords(str: string) {
    return str
      .split(" ")
      .map((w) => w.split("").reverse().join(""))
      .join(" ");
  }

  function handleReverse() {
    if (mode === "full") setText(reverseFull(text));
    else setText(reverseWords(text));
  }

  return (
    <ToolLayout
      title="Text Reverser"
      description="Reverse entire text or reverse each word individually."
      category="Text Tools"
    >
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <select
          className="tool-input"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="full">Reverse Entire Text</option>
          <option value="words">Reverse Each Word</option>
        </select>

        <button className="btn-primary w-full" onClick={handleReverse}>
          Reverse Text
        </button>
      </div>
    </ToolLayout>
  );
}
