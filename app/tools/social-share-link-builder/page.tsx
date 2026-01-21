"use client";

import { useState, useMemo } from "react";
import ToolLayout from "../../../components/ToolLayout";

export default function SocialShareLinkBuilder() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [hashtags, setHashtags] = useState("onlinetools,tools,web");

  const encoded = useMemo(
    () => ({
      url: encodeURIComponent(url),
      text: encodeURIComponent(text),
      hashtags: encodeURIComponent(hashtags.replace(/\s+/g, "")),
    }),
    [url, text, hashtags]
  );

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`,
    twitter: `https://twitter.com/intent/tweet?url=${encoded.url}&text=${encoded.text}&hashtags=${encoded.hashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encoded.text}%20${encoded.url}`,
  };

  const copyLink = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      alert("Link copied to clipboard");
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <ToolLayout
      title="Social Share Link Builder"
      description="Generate ready-to-use share URLs for Facebook, Twitter (X), LinkedIn, and WhatsApp."
      category="Social Media Tools"
    >
      <div className="space-y-4">
        <input
          className="tool-input"
          placeholder="Page URL (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          className="tool-input min-h-[80px]"
          placeholder="Share text / message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          className="tool-input"
          placeholder="Hashtags (comma separated)"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />

        <div className="space-y-3">
          {Object.entries(links).map(([network, link]) => (
            <div
              key={network}
              className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg p-2"
            >
              <div className="flex-1 text-xs break-all">{link}</div>
              <button
                className="btn-primary whitespace-nowrap"
                onClick={() => copyLink(link)}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
