"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [threads, setThreads] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    const k = keyword.trim();
    if (!k) return;

    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/ai/tweet-thread-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: k }),
      });

      const data = await r.json();

      if (!r.ok) {
        throw new Error(data?.error || "Failed to generate thread.");
      }

      setThreads(Array.isArray(data?.threads) ? data.threads : []);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        placeholder="Enter keyword (example: AI, motivation, fitness)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button className="btn-primary w-full" onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Thread"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {threads.map((t, i) => (
          <div
            key={i}
            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm text-slate-100"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="whitespace-pre-wrap">{t}</span>
              <button
                className="text-blue-400 text-xs shrink-0"
                onClick={() => navigator.clipboard.writeText(t)}
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
