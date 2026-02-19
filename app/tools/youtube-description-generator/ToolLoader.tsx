"use client";

import { useState } from "react";

type AiOut = { description: string };

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    const k = keyword.trim();
    if (!k) return;

    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/ai/youtube-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: k }),
      });

      const data = (await r.json()) as any;
      if (!r.ok) throw new Error(data?.error || "Failed to generate.");

      const out = data as AiOut;
      setResult(out.description || "");
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        value={keyword}
        placeholder="Enter keyword (example: travel vlog)"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button className="btn-primary w-full" onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Description"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && (
        <textarea className="tool-input min-h-[300px]" value={result} readOnly />
      )}
    </div>
  );
}
