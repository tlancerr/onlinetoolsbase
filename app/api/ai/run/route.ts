type Provider = "openrouter" | "groq";

function getProvider(): Provider {
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
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const provider = getProvider();
    const config = getApiConfig(provider);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.key}`,
    };

    // OpenRouter recommends these headers
    if (provider === "openrouter") {
      headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL || "https://onlinetoolsbase.com";
      headers["X-Title"] = "OnlineToolsBase AI Tools";
    }

    const response = await fetch(config.url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: "system",
            content: "You are an expert SEO assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("AI API error:", data);
      return Response.json(
        {
          error: data?.error?.message || "AI provider request failed.",
        },
        { status: response.status }
      );
    }

    const result =
      data?.choices?.[0]?.message?.content ||
      "No result returned from AI provider.";

    return Response.json({ result });
  } catch (error) {
    console.error("Route error:", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
