"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function HTACCESSRedirectGenerator() {
  const [oldUrl, setOldUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [output, setOutput] = useState("");

  function generate() {
    if (!oldUrl || !newUrl) {
      setOutput("Enter both old and new URLs.");
      return;
    }

    const rule = `RewriteEngine On
RewriteCond %{HTTP_HOST} ^${oldUrl.replace("https://", "").replace("http://", "")}$
RewriteRule ^(.*)$ ${newUrl}/$1 [R=301,L]`;

    setOutput(rule);
  }

  return (
    <ToolLayout
      title=".htaccess Redirect Generator"
      description="Generate 301 redirect rules for .htaccess."
      category="SEO Tools"
    >
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Old URL"
          value={oldUrl}
          onChange={e => setOldUrl(e.target.value)}
        />

        <input
          className="tool-input"
          placeholder="New URL"
          value={newUrl}
          onChange={e => setNewUrl(e.target.value)}
        />

        <button className="btn-primary" onClick={generate}>
          Generate Redirect Rule
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
