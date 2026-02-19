"use client";

import { useState } from "react";

type AiOut = { tags: string[] };

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    const k = keyword.trim();
    if (!k) return;

    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/ai/youtube-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: k }),
      });

      const data = (await r.json()) as any;
      if (!r.ok) throw new Error(data?.error || "Failed to generate.");

      const out = data as AiOut;
      setTags(Array.isArray(out.tags) ? out.tags : []);
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
        placeholder="Enter keyword (example: digital marketing)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button onClick={generate} className="btn-primary w-full" disabled={loading}>
        {loading ? "Generating..." : "Generate Tags"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {tags.length > 0 && (
        <textarea
          className="tool-input min-h-[200px]"
          value={tags.join(", ")}
          readOnly
        />
      )}
    </div>
  );
}
