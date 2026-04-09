"use client";

import { useState } from "react";

type ToolOutputProps = {
  title?: string;
  result: string;
  loading?: boolean;
};

export default function ToolOutput({
  title = "Output",
  result,
  loading = false,
}: ToolOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result || loading) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <section className="ai-panel">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h2 className="ai-panel-title mb-0">{title}</h2>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!result || loading}
          className="ai-btn-primary"
          style={{
            padding: "10px 14px",
            fontSize: "0.88rem",
            opacity: !result || loading ? 0.65 : 1,
          }}
        >
          {copied ? "Copied" : "Copy Output"}
        </button>
      </div>

      <div className="ai-output-box">
        {loading
          ? "Please wait while the AI generates your result..."
          : result || "Your output will appear here."}
      </div>
    </section>
  );
}
