"use client";

import { useState } from "react";

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    const k = keyword.trim();
    if (!k) return;

    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/ai/tiktok-caption-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: k }),
      });

      const data = await r.json();

      if (!r.ok) {
        throw new Error(data?.error || "Failed to generate captions.");
      }

      setCaptions(data.captions || []);
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
        placeholder="Enter keyword (example: cooking, fitness)"
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        className="btn-primary w-full"
        onClick={generate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Captions"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {captions.map((c, i) => (
          <div
            key={i}
            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-sm flex justify-between text-slate-100"
          >
            <span>{c}</span>
            <button
              className="text-blue-400 text-xs"
              onClick={() => navigator.clipboard.writeText(c)}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
