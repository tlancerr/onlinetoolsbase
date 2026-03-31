"use client";

import { useState } from "react";
import ToolLayout from "@/components/ai/ToolLayout";
import ToolHeader from "@/components/ai/ToolHeader";
import ToolInput from "@/components/ai/ToolInput";
import ToolOutput from "@/components/ai/ToolOutput";

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-violet-500 dark:focus:ring-violet-950";

const buttonClass =
  "inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:scale-[1.01] hover:shadow-md disabled:opacity-50 disabled:hover:scale-100";

export default function MetaGeneratorTool() {
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    if (!keyword.trim()) {
      setResult("Please enter a target keyword.");
      return;
    }

    try {
      setLoading(true);
      setResult("");

      const res = await fetch("/api/ai/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
You are an expert SEO specialist.

Generate:
1. 5 SEO optimized title tags (max 60 characters)
2. 5 meta descriptions (max 155 characters)
3. 3 H1 variations

Keyword: ${keyword}

Context (optional):
${content}
          `,
        }),
      });

      const data = await res.json();
      setResult(data.result || "No result.");
    } catch (error) {
      console.error(error);
      setResult("Error generating meta tags.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      header={
        <ToolHeader
          title="AI Meta Generator"
          description="Generate SEO-optimized title tags, meta descriptions, and H1 ideas instantly."
        />
      }
      input={
        <ToolInput title="SEO Input">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
              Target Keyword
            </label>
            <input
              type="text"
              placeholder="Enter target keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
              Content Context
            </label>
            <textarea
              placeholder="Optional content context..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${fieldClass} min-h-[140px]`}
            />
          </div>

          <button onClick={runAI} disabled={loading} className={buttonClass}>
            {loading ? "Generating..." : "Generate SEO Meta"}
          </button>
        </ToolInput>
      }
      output={
        <ToolOutput
          title="Generated Meta Tags"
          result={result}
          loading={loading}
        />
      }
    />
  );
}
