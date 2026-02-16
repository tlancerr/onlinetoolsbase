"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [output, setOutput] = useState("");

  function generate() {
    const og = `
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image}">
<meta property="og:type" content="website">
`.trim();

    setOutput(og);
  }

  return (
   
      <div className="space-y-4">

        <input className="tool-input" placeholder="OG Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="tool-input h-24" placeholder="OG Description" value={desc} onChange={e => setDesc(e.target.value)} />

        <input className="tool-input" placeholder="Page URL" value={url} onChange={e => setUrl(e.target.value)} />
        <input className="tool-input" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />

        <button className="btn-primary" onClick={generate}>
          Generate OG Tags
        </button>

        {output && (
          <pre className="mt-4 whitespace-pre-wrap bg-slate-900 text-emerald-300 border border-slate-700 p-3 rounded-lg">
            {output}
          </pre>
        )}
      </div>
    
  );
}
