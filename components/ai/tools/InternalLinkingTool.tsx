"use client";

import { useEffect, useState } from "react";
import ToolLayout from "@/components/ai/ToolLayout";
import ToolHeader from "@/components/ai/ToolHeader";
import ToolInput from "@/components/ai/ToolInput";
import ToolOutput from "@/components/ai/ToolOutput";

const FREE_LIMIT = 5;
const STORAGE_KEY = "otb-ai-internal-linking-usage";

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

export default function InternalLinkingTool() {
  const [content, setContent] = useState("");
  const [urls, setUrls] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCountState] = useState(0);

  useEffect(() => {
    setUsageCountState(getUsageCount());
  }, []);

  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const blocked = usageCount >= FREE_LIMIT;

  const handleClear = () => {
    setContent("");
    setUrls("");
    setResult("");
  };

  const runAI = async () => {
    if (!content.trim() || !urls.trim()) {
      setResult("Please enter article content and at least one target URL.");
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

      if (!res.ok) {
        setResult(data?.error || "Request failed. Please check your API setup.");
        return;
      }

      setResult(data.result || "No result returned.");

      const newCount = currentUsage + 1;
      setUsageCount(newCount);
      setUsageCountState(newCount);
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
        <div className="ai-stack">
          <ToolInput title="Article Input">
            <div>
              <label className="ai-label">Article Content</label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your article content here..."
                className="ai-field-textarea ai-field-textarea-lg"
              />
            </div>

            <div>
              <label className="ai-label">Target URLs</label>

              <textarea
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="Paste one target URL per line..."
                className="ai-field-textarea"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={runAI}
                disabled={loading || blocked}
                className="ai-btn-primary"
              >
                {loading ? "Generating..." : "Generate Internal Links"}
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
          title="Internal Linking Suggestions"
          result={result}
          loading={loading}
        />
      }
      sidebar={
        <div className="ai-side-card">
          <h3 className="ai-side-title">Tool tips</h3>

          <div className="ai-side-list">
            <div className="ai-side-link">
              Use the full article, not only one paragraph.
            </div>
            <div className="ai-side-link">
              Keep target URLs tightly relevant.
            </div>
            <div className="ai-side-link">
              Review suggested anchors before publishing.
            </div>
          </div>
        </div>
      }
    />
  );
}
