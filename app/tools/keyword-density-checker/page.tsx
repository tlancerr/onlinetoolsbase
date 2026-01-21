"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [output, setOutput] = useState("");

  function analyze() {
    if (!text.trim()) return setOutput("Enter some text.");
    if (!keyword.trim()) return setOutput("Enter a keyword.");

    const words = text.toLowerCase().trim().split(/\s+/);
    const totalWords = words.length;

    const key = keyword.toLowerCase();
    const count = words.filter(w => w === key).length;

    const density = ((count / totalWords) * 100).toFixed(2);

    setOutput(
      `Total Words: ${totalWords}
Keyword Occurrences: ${count}
Keyword Density: ${density}%`
    );
  }

  return (
    <ToolLayout
      title="Keyword Density Checker"
      description="Analyze keyword density, word count, and keyword frequency."
      category="SEO Tools"
    >
      <div className="space-y-4">

        <textarea
          className="tool-input h-48"
          placeholder="Paste your article text here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <input
          className="tool-input"
          placeholder="Enter keyword"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />

        <button className="btn-primary" onClick={analyze}>
          Analyze Density
        </button>

        {output && (
          <pre className="mt-4 whitespace-pre-wrap text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-700">
            {output}
          </pre>
        )}
      </div>
    </ToolLayout>
  );
}
