"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function FindReplace() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");

  function handleReplace() {
    if (!find.trim()) {
      alert("Enter text to find.");
      return;
    }

    const regex = new RegExp(find, "g");
    setText(text.replace(regex, replace));
  }

  return (
    <ToolLayout
      title="Find & Replace"
      description="Find any word or phrase and replace it with new text."
      category="Text Tools"
    >
      <div className="space-y-4">
        <textarea
          className="tool-input min-h-[200px]"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          className="tool-input"
          placeholder="Find..."
          value={find}
          onChange={(e) => setFind(e.target.value)}
        />

        <input
          className="tool-input"
          placeholder="Replace with..."
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
        />

        <button className="btn-primary w-full" onClick={handleReplace}>
          Replace
        </button>
      </div>
    </ToolLayout>
  );
}
