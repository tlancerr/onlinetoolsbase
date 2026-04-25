import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { getUsage, incrementUsage } from "@/lib/usage";

type Provider = "openrouter" | "groq";

const GUEST_FREE_LIMIT = 2;
const USER_FREE_LIMIT = 5;

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

async function getOrSetGuestId() {
  const cookieStore = await cookies();
  let guestId = cookieStore.get("guest_id")?.value;

  if (!guestId) {
    guestId = randomUUID();
    cookieStore.set("guest_id", guestId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return guestId;
}

export async function POST(req: Request) {
  try {
    const { prompt, toolSlug } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json(
        { ok: false, error: "Prompt is required." },
        { status: 400 }
      );
    }

    if (!toolSlug || typeof toolSlug !== "string") {
      return Response.json(
        { ok: false, error: "toolSlug is required." },
        { status: 400 }
      );
    }

    const { userId } = await auth();
    const guestId = userId ? undefined : await getOrSetGuestId();

    const usage = await getUsage({
      userId: userId || undefined,
      guestId,
      toolSlug,
    });

    const currentCount = usage?.count || 0;
    const limit = userId ? USER_FREE_LIMIT : GUEST_FREE_LIMIT;

    if (currentCount >= limit) {
      return Response.json({
        ok: false,
        code: userId ? "UPGRADE_REQUIRED" : "LOGIN_REQUIRED",
        message: userId
          ? "You have reached your free daily limit. Upgrade to continue."
          : "You have reached your guest free limit. Sign in to continue.",
        usageCount: currentCount,
        limit,
      });
    }

    const provider = getProvider();
    const config = getApiConfig(provider);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.key}`,
    };

    if (provider === "openrouter") {
      headers["HTTP-Referer"] =
        process.env.NEXT_PUBLIC_SITE_URL || "https://onlinetoolsbase.com";
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
            content: "You are an expert AI assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    let data;

try {
  data = await response.json();
} catch (err) {
  console.error("Invalid JSON response:", err);

  return Response.json(
    {
      ok: false,
      error: "AI provider returned invalid JSON.",
    },
    { status: 500 }
  );
}

if (!response.ok) {
  console.error("AI API error:", data);

  return Response.json(
    {
      ok: false,
      error: data?.error?.message || "AI provider request failed.",
    },
    { status: 500 }
  );
}

const result =
  data?.choices?.[0]?.message?.content ||
  "No result returned from AI provider.";

await incrementUsage({
  userId: userId || undefined,
  guestId,
  toolSlug,
});

return Response.json({
  ok: true,
  result,
  usageCount: currentCount + 1,
  limit,
});
  } catch (error) {
  console.error("Route error:", error);

  return Response.json(
    {
      ok: false,
      error: error instanceof Error ? error.message : "Unexpected server error",
    },
    { status: 500 }
  );
}
}
