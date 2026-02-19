import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Provider = "openrouter" | "groq";

function getProvider(): Provider {
  // default to groq (change to openrouter if you want)
  return (process.env.AI_PROVIDER as Provider) || "groq";
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
    const { keyword } = (await req.json()) as { keyword?: string };

    if (!keyword || !keyword.trim()) {
      return NextResponse.json({ error: "Keyword is required." }, { status: 400 });
    }

    const provider = getProvider();
    const { url, key, model } = getApiConfig(provider);

    const system =
      "You are a YouTube copywriter. Return ONLY valid JSON. No markdown. No extra text.";

    const user = `
Create ONE YouTube video description for this topic: "${keyword}"

Return JSON exactly like:
{
  "description": string
}

Rules:
- Write in clean, natural English
- Use short headings and line breaks (plain text)
- Include:
  1) Hook / intro (1-2 lines)
  2) What you will learn (5 bullet points)
  3) Chapters (6 timestamps like 00:00, 00:30, 02:15...)
  4) CTA (like/share/subscribe) (1 line)
  5) Links block (Instagram, Facebook, Website)
- Keep emojis reasonable (0-6 total)
- No hashtags spam (max 3 hashtags total, optional)
- Keep it useful and not repetitive
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
        temperature: 0.85,
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

    const description =
      typeof parsed?.description === "string" ? parsed.description : "";

    return NextResponse.json({ description });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}
