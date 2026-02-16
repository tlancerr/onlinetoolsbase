"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");

  function generate() {
    if (!url) return setOutput("Please enter a URL.");

    const tag = `<link rel="canonical" href="${url}">`;
    setOutput(tag);
  }

  return (
    
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter full URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="btn-primary" onClick={generate}>
          Generate Canonical Tag
        </button>

        {output && (
          <pre className="bg-slate-900 text-emerald-300 border border-slate-700 rounded-lg p-3 mt-4 whitespace-pre-wrap">
            {output}
          </pre>
        )}

      </div>
    
  );
}
