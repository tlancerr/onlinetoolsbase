"use client";

import { useState } from "react";

type AiResult = {
  semantic: string[];
  longTail: string[];
  questions: string[];
  topics: string[];
};

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [semanticList, setSemanticList] = useState<string[]>([]);
  const [longTailList, setLongTailList] = useState<string[]>([]);
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [topicList, setTopicList] = useState<string[]>([]);

  async function handleGenerate() {
    const k = keyword.trim();
    if (!k) return;

    setLoading(true);
    setError(null);

    try {
      const r = await fetch("/api/ai/semantic-keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: k }),
      });

      const data = (await r.json()) as any;

      if (!r.ok) {
        throw new Error(data?.error || "Failed to generate.");
      }

      const out = data as AiResult;

      setSemanticList(out.semantic || []);
      setLongTailList(out.longTail || []);
      setQuestionList(out.questions || []);
      setTopicList(out.topics || []);
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
        placeholder="Enter main keyword (e.g. SEO audit, crypto trading, best laptops)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Semantic SEO Ideas"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-700 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {(semanticList.length > 0 ||
        longTailList.length > 0 ||
        questionList.length > 0 ||
        topicList.length > 0) && (
        <div className="mt-6 space-y-6">
          {semanticList.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Semantic / LSI Keywords
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-emerald-200">
                {semanticList.map((item, i) => (
                  <li key={`sem-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {longTailList.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Long-Tail Keyword Ideas
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-emerald-200">
                {longTailList.map((item, i) => (
                  <li key={`lt-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {questionList.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Questions to Answer in Your Article
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-emerald-200">
                {questionList.map((item, i) => (
                  <li key={`q-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {topicList.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                Topic & Heading Ideas
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 text-emerald-200">
                {topicList.map((item, i) => (
                  <li key={`t-${i}`}>{item}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
