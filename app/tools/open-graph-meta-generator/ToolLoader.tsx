"use client";

import { useState } from "react";


export default function ToolLoader() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("website");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");

  const metaCode = `
<!-- Open Graph -->
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="${siteName}" />
<meta property="og:type" content="${type}" />
<meta property="og:image" content="${image}" />

<!-- Twitter -->
<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${image}" />
`.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(metaCode);
      alert("Meta tags copied to clipboard!");
    } catch {
      alert("Failed to copy.");
    }
  };

  return (
    
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-3">
          <input
            className="tool-input"
            placeholder="Page title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="tool-input min-h-[80px]"
            placeholder="Page description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="tool-input"
            placeholder="Page URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="tool-input"
            placeholder="Site name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
          <input
            className="tool-input"
            placeholder="OG image URL (https://...)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="flex gap-3">
            <select
              className="tool-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="website">website</option>
              <option value="article">article</option>
              <option value="product">product</option>
            </select>

            <select
              className="tool-input"
              value={twitterCard}
              onChange={(e) => setTwitterCard(e.target.value)}
            >
              <option value="summary_large_image">summary_large_image</option>
              <option value="summary">summary</option>
            </select>
          </div>

          <button onClick={handleCopy} className="btn-primary w-full">
            Copy Meta Tags
          </button>
        </div>

        {/* Right: Code preview */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100">
          <pre className="whitespace-pre-wrap break-all font-mono">
            {metaCode}
          </pre>
        </div>
      </div>
    
  );
}
