"use client";

import { useState } from "react";

type AiOut = { sets: string[] };

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    const k = keyword.trim();
    if (!k) return;

    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/ai/instagram-hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: k }),
      });

      const data = (await r.json()) as any;
      if (!r.ok) throw new Error(data?.error || "Failed to generate.");

      const out = data as AiOut;
      setResult(Array.isArray(out.sets) ? out.sets : []);
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
        placeholder="Enter niche (travel, food, fitness, etc.)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button className="btn-primary w-full" onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Hashtags"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {result.map((set, i) => (
          <div
            key={i}
            className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 flex justify-between gap-3"
          >
            <span className="break-words">{set}</span>
            <button
              className="text-blue-400 text-xs shrink-0"
              onClick={() => navigator.clipboard.writeText(set)}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
