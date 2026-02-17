import { NextResponse } from "next/server";

export const runtime = "nodejs"; // important for server-side fetch

type Provider = "openrouter" | "groq";

function getProvider(): Provider {
  // You can later make this dynamic (dropdown in UI). For now, pick default:
  return (process.env.AI_PROVIDER as Provider) || "openrouter";
}

function getApiConfig(provider: Provider) {
  if (provider === "groq") {
    const key = process.env.GROQ_API_KEY;
    if (!key) throw new Error("Missing GROQ_API_KEY");
    return {
      url: "https://api.groq.com/openai/v1/chat/completions",
      key,
      model: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
    };
  }

  // openrouter
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("Missing OPENROUTER_API_KEY");
  return {
    url: "https://openrouter.ai/api/v1/chat/completions",
    key,
    model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
  };
}

export async function POST(req: Request) {
  try {
    const { keyword } = (await req.json()) as { keyword?: string };

    if (!keyword || !keyword.trim()) {
      return NextResponse.json({ error: "Keyword is required." }, { status: 400 });
    }

    const provider = getProvider();
    const { url, key, model } = getApiConfig(provider);

    const system = `You are an SEO assistant. Return ONLY valid JSON (no markdown, no extra text).`;
    const user = `
Generate SEO ideas for this keyword: "${keyword}"

Return JSON with exactly these keys:
{
  "semantic": string[],
  "longTail": string[],
  "questions": string[],
  "topics": string[]
}

Rules:
- 12 semantic items
- 12 longTail items
- 10 questions
- 9 topics
- No duplicates
- Keep items short and human-readable
- Do not include year unless highly relevant
`;

    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        // OpenRouter optional headers (safe to include)
        ...(provider === "openrouter"
          ? {
              "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://onlinetoolsbase.com",
              "X-Title": "OnlineToolsBase",
            }
          : {}),
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        temperature: 0.7,
      }),
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      return NextResponse.json(
        { error: `AI request failed (${r.status}).`, details: txt.slice(0, 500) },
        { status: 500 }
      );
    }

    const data = await r.json();
    const content: string =
      data?.choices?.[0]?.message?.content || "";

    // Parse the model output as JSON
    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      // attempt to salvage JSON if model returned extra text
      const match = content.match(/\{[\s\S]*\}$/);
      if (!match) throw new Error("AI did not return JSON.");
      parsed = JSON.parse(match[0]);
    }

    // Minimal shape validation
    const out = {
      semantic: Array.isArray(parsed.semantic) ? parsed.semantic : [],
      longTail: Array.isArray(parsed.longTail) ? parsed.longTail : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      topics: Array.isArray(parsed.topics) ? parsed.topics : [],
    };

    return NextResponse.json(out);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
