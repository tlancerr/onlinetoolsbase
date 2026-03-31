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

export default function InternalLinkingTool() {
  const [content, setContent] = useState("");
  const [urls, setUrls] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    if (!content.trim() || !urls.trim()) {
      setResult("Please enter article content and at least one target URL.");
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
You are an SEO internal linking specialist.

Analyze the article content below and the target URLs list.

Your task:
1. Suggest the best internal linking opportunities.
2. Recommend anchor text for each suggestion.
3. Explain where in the content the link should be inserted.
4. Keep suggestions practical and SEO-friendly.

ARTICLE CONTENT:
${content}

TARGET URLS:
${urls}
          `,
        }),
      });

      const data = await res.json();
      setResult(data.result || "No result returned.");
    } catch (error) {
      console.error(error);
      setResult("Something went wrong while generating internal link suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      header={
        <ToolHeader
          title="AI Internal Linking Tool"
          description="Generate smart internal linking suggestions, anchor text ideas, and placement recommendations for your articles."
        />
      }
      input={
        <ToolInput title="Article Input">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
              Article Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your article content here..."
              className={`${fieldClass} min-h-[200px]`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
              Target URLs
            </label>
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="Paste one target URL per line..."
              className={`${fieldClass} min-h-[110px]`}
            />
          </div>

          <button onClick={runAI} disabled={loading} className={buttonClass}>
            {loading ? "Generating..." : "Generate Internal Links"}
          </button>
        </ToolInput>
      }
      output={
        <ToolOutput
          title="Internal Linking Suggestions"
          result={result}
          loading={loading}
        />
      }
      sidebar={
        <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/60">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Tool tips
          </h3>
          <ul className="space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li>Use the full article, not only one paragraph.</li>
            <li>Keep target URLs tightly relevant.</li>
            <li>Review suggested anchors before publishing.</li>
          </ul>
        </div>
      }
    />
  );
}
