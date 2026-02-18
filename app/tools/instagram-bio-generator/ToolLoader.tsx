"use client";

import { useState } from "react";

type AiResult = {
  bios: string[];
};

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    const k = keyword.trim();
    if (!k) {
      setError("Please enter a keyword.");
      return;
    }

    setLoading(true);
    setError(null);
    setBios([]);

    try {
      const r = await fetch("/api/ai/instagram-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: k }),
      });

      const data = (await r.json()) as any;
      if (!r.ok) throw new Error(data?.error || "Failed to generate.");

      const out = data as AiResult;
      setBios(out.bios || []);
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
        placeholder="Enter keyword (travel, fitness, photography...)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button className="btn-primary w-full" onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Bios"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {bios.map((bio, i) => (
          <div
            key={i}
            className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 flex justify-between gap-3"
          >
            <span className="break-words">{bio}</span>
            <button
              className="text-blue-400 text-xs shrink-0"
              onClick={() => navigator.clipboard.writeText(bio)}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
