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

export default function SchemaGeneratorTool() {
  const [type, setType] = useState("faq");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const runAI = async () => {
    if (!content.trim()) {
      setResult("Please enter content.");
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
You are a structured data expert.

Generate valid JSON-LD schema.

Schema type: ${type}

Content:
${content}

Return only JSON-LD code.
          `,
        }),
      });

      const data = await res.json();
      setResult(data.result || "No schema generated.");
    } catch (error) {
      console.error(error);
      setResult("Error generating schema.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      header={
        <ToolHeader
          title="AI Schema Generator"
          description="Generate JSON-LD structured data for FAQ, Article, Product, and more."
        />
      }
      input={
        <ToolInput title="Schema Input">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
              Schema Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={fieldClass}
            >
              <option value="faq">FAQ Schema</option>
              <option value="article">Article Schema</option>
              <option value="product">Product Schema</option>
              <option value="localbusiness">Local Business Schema</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-900 dark:text-white">
              Content
            </label>
            <textarea
              placeholder="Enter content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`${fieldClass} min-h-[140px]`}
            />
          </div>

          <button onClick={runAI} disabled={loading} className={buttonClass}>
            {loading ? "Generating..." : "Generate Schema"}
          </button>
        </ToolInput>
      }
      output={
        <ToolOutput
          title="JSON-LD Output"
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
            <li>Use clear input for better results.</li>
            <li>Give enough context.</li>
            <li>Review output before publishing.</li>
          </ul>
        </div>
      }
    />
  );
}
