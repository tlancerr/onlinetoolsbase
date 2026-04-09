"use client";

import { useMemo, useState } from "react";
import ToolLayout from "@/components/ai/ToolLayout";
import ToolHeader from "@/components/ai/ToolHeader";
import ToolInput from "@/components/ai/ToolInput";
import ToolOutput from "@/components/ai/ToolOutput";

const FREE_LIMIT = 5;
const STORAGE_KEY = "otb-ai-meta-usage";

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function getUsageCount(): number {
  if (typeof window === "undefined") return 0;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;

    const parsed = JSON.parse(raw);
    if (parsed.date !== getTodayKey()) return 0;

    return Number(parsed.count || 0);
  } catch {
    return 0;
  }
}

function setUsageCount(count: number) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      date: getTodayKey(),
      count,
    })
  );
}

export default function MetaGeneratorTool() {
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCountState] = useState(0);

  useMemo(() => {
    if (typeof window !== "undefined") {
      setUsageCountState(getUsageCount());
    }
  }, []);

  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const blocked = usageCount >= FREE_LIMIT;

  const handleClear = () => {
    setKeyword("");
    setContent("");
    setResult("");
  };

  const runAI = async () => {
    if (!keyword.trim()) {
      setResult("Please enter a target keyword.");
      return;
    }

    const currentUsage = getUsageCount();

    if (currentUsage >= FREE_LIMIT) {
      setResult(
        "You have reached the free daily limit for this tool. Upgrade access can unlock higher usage."
      );
      setUsageCountState(currentUsage);
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

      const newCount = currentUsage + 1;
      setUsageCount(newCount);
      setUsageCountState(newCount);
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
        <div className="ai-stack">
          <ToolInput title="SEO Input">
            <div>
              <label className="ai-label">Target Keyword</label>

              <input
                type="text"
                placeholder="Enter target keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="ai-field"
              />
            </div>

            <div>
              <label className="ai-label">Content Context</label>

              <textarea
                placeholder="Optional content context..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="ai-field-textarea"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={runAI}
                disabled={loading || blocked}
                className="ai-btn-primary"
              >
                {loading ? "Generating..." : "Generate SEO Meta"}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="ai-side-link"
                style={{
                  cursor: "pointer",
                  padding: "14px 18px",
                  fontWeight: 700,
                }}
              >
                Clear
              </button>
            </div>
          </ToolInput>

          <div className="ai-side-card">
            <h3 className="ai-side-title">Free Usage</h3>

            <div className="ai-side-list">
              <div className="ai-side-link">
                Daily free runs used: <strong>{usageCount}</strong> / {FREE_LIMIT}
              </div>
              <div className="ai-side-link">
                Remaining today: <strong>{remaining}</strong>
              </div>
            </div>
          </div>

          <div className="ai-side-card">
            <h3 className="ai-side-title">Upgrade for More</h3>

            <div className="ai-side-list">
              <div className="ai-side-link">
                Unlock more daily runs, future saved history, and premium tool access.
              </div>

              <a
                href="/pricing"
                className="ai-btn-primary"
                style={{
                  textAlign: "center",
                  marginTop: "6px",
                }}
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      }
      output={
        <ToolOutput
          title="Generated Meta Tags"
          result={result}
          loading={loading}
        />
      }
      sidebar={
        <div className="ai-side-card">
          <h3 className="ai-side-title">Tool tips</h3>

          <div className="ai-side-list">
            <div className="ai-side-link">
              Use one clear primary keyword.
            </div>
            <div className="ai-side-link">
              Add page context for better title ideas.
            </div>
            <div className="ai-side-link">
              Review generated copy before publishing.
            </div>
          </div>
        </div>
      }
    />
  );
}
