"use client";

import { useState } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function GoogleSERPPreview() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");

  return (
    <ToolLayout
      title="Google SERP Preview"
      description="Preview how your webpage will appear in Google search results."
      category="SEO Tools"
    >
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Page Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="tool-input h-24"
          placeholder="Meta Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />

        <input
          className="tool-input"
          placeholder="Page URL"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />

        {/* Preview Box */}
        <div className="bg-white text-black p-4 rounded-lg mt-6 shadow-md border">
          <p className="text-sm text-green-700">{url || "https://example.com"}</p>
          <p className="text-blue-700 text-lg font-semibold">
            {title || "Example Page Title - Google SERP Preview"}
          </p>
          <p className="text-gray-800 text-sm">
            {desc || "This is how your meta description will appear in Google search results."}
          </p>
        </div>

      </div>
    </ToolLayout>
  );
}
