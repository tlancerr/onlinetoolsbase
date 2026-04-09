"use client";

import { useEffect, useState } from "react";
import ToolLayout from "@/components/ai/ToolLayout";
import ToolHeader from "@/components/ai/ToolHeader";
import ToolInput from "@/components/ai/ToolInput";
import ToolOutput from "@/components/ai/ToolOutput";

const FREE_LIMIT = 5;
const STORAGE_KEY = "otb-ai-schema-generator-usage";

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

export default function SchemaGeneratorTool() {
  const [type, setType] = useState("faq");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCountState] = useState(0);

  useEffect(() => {
    setUsageCountState(getUsageCount());
  }, []);

  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const blocked = usageCount >= FREE_LIMIT;

  const handleClear = () => {
    setType("faq");
    setContent("");
    setResult("");
  };

  const runAI = async () => {
    if (!content.trim()) {
      setResult("Please enter content.");
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

      if (!res.ok) {
        setResult(data?.error || "Request failed. Please check your API setup.");
        return;
      }

      setResult(data.result || "No schema generated.");

      const newCount = currentUsage + 1;
      setUsageCount(newCount);
      setUsageCountState(newCount);
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
        <div className="ai-stack">
          <ToolInput title="Schema Input">
            <div>
              <label className="ai-label">Schema Type</label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="ai-field-select"
              >
                <option value="faq">FAQ Schema</option>
                <option value="article">Article Schema</option>
                <option value="product">Product Schema</option>
                <option value="localbusiness">Local Business Schema</option>
              </select>
            </div>

            <div>
              <label className="ai-label">Content</label>

              <textarea
                placeholder="Enter content..."
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
                {loading ? "Generating..." : "Generate Schema"}
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
          title="JSON-LD Output"
          result={result}
          loading={loading}
        />
      }
      sidebar={
        <div className="ai-side-card">
          <h3 className="ai-side-title">Tool tips</h3>

          <div className="ai-side-list">
            <div className="ai-side-link">
              Choose the schema type that matches the page.
            </div>
            <div className="ai-side-link">
              Use clean source content for better output.
            </div>
            <div className="ai-side-link">
              Validate the generated JSON-LD before publishing.
            </div>
          </div>
        </div>
      }
    />
  );
}
