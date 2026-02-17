"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [domain, setDomain] = useState("");
  const [urls, setUrls] = useState("");
  const [output, setOutput] = useState("");

  function generate() {
    if (!domain) return setOutput("Please enter your website URL.");

    const list = urls
      .split(/\s+/)
      .filter((u) => u.trim().length > 0)
      .map((u) => `<url><loc>${domain}${u}</loc></url>`)
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list}
</urlset>`;

    setOutput(xml);
  }

  return (
    
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Website URL (example: https://example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />

        <textarea
          className="tool-input h-36"
          placeholder="Enter page paths (one per line), e.g.
/about
/contact
/blog/post-1"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
        />

        <button className="btn-primary" onClick={generate}>
          Generate Sitemap
        </button>

        {output && (
          <pre className="bg-slate-900 text-emerald-300 border border-slate-700 p-3 mt-4 rounded-lg whitespace-pre-wrap">
            {output}
          </pre>
        )}
      </div>
    
  );
}
