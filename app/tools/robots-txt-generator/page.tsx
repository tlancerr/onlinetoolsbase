"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function RobotsTxtGenerator() {
  const [mode, setMode] = useState("allow");
  const [sitemap, setSitemap] = useState("");
  const [custom, setCustom] = useState("");
  const [output, setOutput] = useState("");

  function generate() {
    let text = "User-agent: *\n";

    if (mode === "allow") text += "Disallow:";
    if (mode === "disallow") text += "Disallow: /";
    if (mode === "custom") text += custom;

    if (sitemap) text += `\nSitemap: ${sitemap}`;

    setOutput(text);
  }

  return (
    <ToolLayout
      title="Robots.txt Generator"
      description="Create a clean SEO-friendly robots.txt file for your website."
      category="SEO Tools"
    >
      <div className="space-y-4">

        <select
          className="tool-input"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="allow">Allow All</option>
          <option value="disallow">Disallow All</option>
          <option value="custom">Custom Rules</option>
        </select>

        {mode === "custom" && (
          <textarea
            className="tool-input h-32"
            placeholder="Enter custom rules, e.g. Disallow: /admin"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        )}

        <input
          className="tool-input"
          placeholder="Sitemap URL (optional)"
          value={sitemap}
          onChange={(e) => setSitemap(e.target.value)}
        />

        <button className="btn-primary" onClick={generate}>
          Generate robots.txt
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
