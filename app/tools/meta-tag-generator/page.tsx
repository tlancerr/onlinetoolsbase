"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [output, setOutput] = useState("");

  function generate() {
    let meta = `
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
`.trim();

    setOutput(meta);
  }

  return (
    <ToolLayout
      title="Meta Tag Generator"
      description="Generate SEO-friendly meta title, description, and keywords instantly."
      category="SEO Tools"
    >
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Page Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="tool-input h-28"
          placeholder="Meta Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="tool-input"
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <button className="btn-primary" onClick={generate}>
          Generate Meta Tags
        </button>

        {output && (
          <pre className="bg-slate-900 text-emerald-300 border border-slate-700 p-3 mt-4 rounded-lg whitespace-pre-wrap">
            {output}
          </pre>
        )}

      </div>
    </ToolLayout>
  );
}
