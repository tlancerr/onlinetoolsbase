"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [text, setText] = useState("");

  return (
    
      <div className="space-y-4">

        <textarea
          className="tool-input h-48"
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="p-4 bg-slate-900 border border-slate-700 rounded-lg text-emerald-300 space-y-2">
          <p>Total Characters: {text.length}</p>
          <p>Without Spaces: {text.replace(/\s+/g, "").length}</p>
          <p>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</p>
        </div>

      </div>
    
  );
}
