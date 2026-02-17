"use client";

import { useState } from "react";


// Very simple stopword list
const stopwords = [
  "the","a","an","of","in","for","to","and","or","on","with","at","by","from",
  "best","top","cheap","buy","guide","review","reviews"
];

// Domain-specific semantic helpers
const domainSemantics: Record<string, string[]> = {
  seo: [
    "search engine optimization",
    "on-page SEO",
    "technical SEO",
    "backlink strategy",
    "keyword research",
    "content optimization",
    "site audit",
  ],
  realestate: [
    "property investment",
    "housing market",
    "rental yield",
    "mortgage rates",
    "real estate agent",
    "home valuation",
  ],
  laptop: [
    "ultrabook",
    "gaming laptop",
    "battery life",
    "performance benchmarks",
    "portable computer",
    "RAM and storage",
  ],
  crypto: [
    "blockchain",
    "bitcoin",
    "ethereum",
    "crypto exchange",
    "wallet security",
    "altcoins",
    "market volatility",
  ],
  fitness: [
    "workout routine",
    "strength training",
    "cardio exercise",
    "calorie deficit",
    "nutrition plan",
    "fat loss",
  ],
  finance: [
    "personal budget",
    "interest rates",
    "loans and mortgages",
    "investment portfolio",
    "stock market",
    "retirement planning",
  ],
};

function extractRootKeyword(input: string): string {
  const words = input
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !stopwords.includes(w));
  if (!words.length) return input.trim();
  return words.join(" ");
}

function generateSemanticKeywords(main: string): string[] {
  const list: string[] = [];
  const lower = main.toLowerCase();

  // domain detection
  if (lower.includes("seo")) list.push(...domainSemantics.seo);
  if (lower.includes("real estate") || lower.includes("property"))
    list.push(...domainSemantics.realestate);
  if (lower.includes("laptop") || lower.includes("notebook"))
    list.push(...domainSemantics.laptop);
  if (lower.includes("crypto") || lower.includes("bitcoin") || lower.includes("ethereum"))
    list.push(...domainSemantics.crypto);
  if (lower.includes("fitness") || lower.includes("weight loss") || lower.includes("gym"))
    list.push(...domainSemantics.fitness);
  if (lower.includes("loan") || lower.includes("invest") || lower.includes("finance"))
    list.push(...domainSemantics.finance);

  // generic semantic patterns
  list.push(
    `${main} tutorial`,
    `${main} examples`,
    `${main} checklist`,
    `${main} strategy`,
    `${main} tools`,
    `${main} tips`,
    `${main} mistakes to avoid`,
    `${main} step by step`
  );

  return Array.from(new Set(list));
}

function generateLongTails(main: string): string[] {
  const templates = [
    `best ${main} 2025`,
    `${main} for beginners`,
    `${main} for advanced users`,
    `${main} for students`,
    `${main} for small business`,
    `${main} near me`,
    `cheap ${main}`,
    `${main} without experience`,
    `${main} vs alternatives`,
    `top 10 ${main}`,
    `${main} checklist`,
    `how to choose ${main}`,
  ];
  return Array.from(new Set(templates));
}

function generateQuestions(main: string): string[] {
  const q = [
    `What is ${main}?`,
    `How does ${main} work?`,
    `Why is ${main} important?`,
    `How to start with ${main}?`,
    `What are the benefits of ${main}?`,
    `What are the risks of ${main}?`,
    `Which is the best ${main}?`,
    `How to optimize ${main} for better results?`,
    `Common mistakes when using ${main}?`,
    `Can beginners use ${main}?`,
  ];
  return q;
}

function generateTopics(main: string): string[] {
  const t = [
    `Introduction to ${main}`,
    `Pros and Cons of ${main}`,
    `${main}: Complete Beginner's Guide`,
    `Advanced Strategies for ${main}`,
    `Common Myths About ${main}`,
    `${main} Case Studies and Real Examples`,
    `Tools and Resources for ${main}`,
    `Checklist Before Using ${main}`,
    `Future Trends in ${main}`,
  ];
  return t;
}

export default function ToolLoader() {
  const [keyword, setKeyword] = useState("");
  const [semanticList, setSemanticList] = useState<string[]>([]);
  const [longTailList, setLongTailList] = useState<string[]>([]);
  const [questionList, setQuestionList] = useState<string[]>([]);
  const [topicList, setTopicList] = useState<string[]>([]);

  function handleGenerate() {
    if (!keyword.trim()) return;

    const main = extractRootKeyword(keyword);

    const semantics = generateSemanticKeywords(main);
    const longtails = generateLongTails(main);
    const questions = generateQuestions(main);
    const topics = generateTopics(main);

    setSemanticList(semantics);
    setLongTailList(longtails);
    setQuestionList(questions);
    setTopicList(topics);
  }

  return (
   
      <div className="space-y-4">

        <input
          className="tool-input"
          placeholder="Enter main keyword (e.g. best laptops 2025, SEO audit, crypto trading)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button className="btn-primary" onClick={handleGenerate}>
          Generate Semantic SEO Ideas
        </button>

        {(semanticList.length > 0 ||
          longTailList.length > 0 ||
          questionList.length > 0 ||
          topicList.length > 0) && (
          <div className="mt-6 space-y-6">

            {/* Semantic keywords */}
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

            {/* Long-tail keywords */}
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

            {/* Questions */}
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

            {/* Topics / headings */}
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
