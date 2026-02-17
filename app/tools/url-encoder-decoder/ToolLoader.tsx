"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  function encodeURL() {
    try {
      setOutput(encodeURIComponent(text));
    } catch {
      setOutput("Invalid input.");
    }
  }

  function decodeURL() {
    try {
      setOutput(decodeURIComponent(text));
    } catch {
      setOutput("Invalid encoded URL.");
    }
  }

  return (

      <div className="space-y-4">

        <textarea
          className="tool-input h-48"
          placeholder="Enter URL or text..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <div className="flex gap-2 flex-wrap">
          <button className="btn-primary" onClick={encodeURL}>Encode URL</button>
          <button className="btn-primary" onClick={decodeURL}>Decode URL</button>
        </div>

        {output && (
          <textarea
            className="tool-input h-48 text-emerald-300"
            readOnly
            value={output}
          />
        )}
      </div>
   
  );
}
