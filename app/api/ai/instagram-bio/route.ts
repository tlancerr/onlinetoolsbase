import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Provider = "openrouter" | "groq";
type Kind = "bio" | "caption";

function getProvider(): Provider {
  return (process.env.AI_PROVIDER as Provider) || "groq"; // default to groq for these tools
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
    const body = (await req.json()) as {
      keyword?: string;
      kind?: Kind;
      tone?: string; // optional
    };

    const keyword = (body.keyword || "").trim();
    const kind = (body.kind || "bio") as Kind;
    const tone = (body.tone || "").trim();

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required." }, { status: 400 });
    }
    if (!["bio", "caption"].includes(kind)) {
      return NextResponse.json({ error: "Invalid kind." }, { status: 400 });
    }

    const provider = getProvider();
    const { url, key, model } = getApiConfig(provider);

    const system =
      `You are a social media copy assistant. ` +
      `Return ONLY valid JSON (no markdown, no extra text).`;

    const user =
      kind === "bio"
        ? `
Generate Instagram bio ideas for this niche/keyword: "${keyword}"
${tone ? `Tone: "${tone}"` : ""}

Return JSON exactly as:
{ "items": string[] }

Rules:
- 12 items
- Each bio max 120 characters
- Mix styles: clean, aesthetic, professional, witty
- Avoid duplicates
- No numbering, no bullets
`
        : `
Generate Instagram caption ideas for this topic/keyword: "${keyword}"
${tone ? `Tone: "${tone}"` : ""}

Return JSON exactly as:
{ "items": string[] }

Rules:
- 15 items
- Each caption max 180 characters
- Mix styles: short, medium, CTA, question, storytelling
- Avoid duplicates
- No numbering, no bullets
`;

    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        ...(provider === "openrouter"
          ? {
              "HTTP-Referer":
                process.env.NEXT_PUBLIC_SITE_URL || "https://onlinetoolsbase.com",
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
        temperature: 0.8,
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
    const content: string = data?.choices?.[0]?.message?.content || "";

    let parsed: any;
    try {
      parsed = JSON.parse(content);
    } catch {
      const match = content.match(/\{[\s\S]*\}$/);
      if (!match) throw new Error("AI did not return JSON.");
      parsed = JSON.parse(match[0]);
    }

    const items = Array.isArray(parsed.items) ? parsed.items : [];
    return NextResponse.json({ items });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
