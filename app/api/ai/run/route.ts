import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { z } from "zod";
import { getUsage, incrementUsage } from "@/lib/usage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Provider = "openrouter" | "groq";

const GUEST_FREE_LIMIT = 2;
const USER_FREE_LIMIT = 5;
const REQUEST_TIMEOUT_MS = 25000;
const MAX_RETRIES_PER_PROVIDER = 2;

const AiRunSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(5, "Please enter a valid prompt.")
    .max(8000, "Prompt is too long."),
  toolSlug: z
    .string()
    .trim()
    .min(2, "Tool slug is required.")
    .max(80, "Tool slug is too long."),
});

function getPreferredProvider(): Provider {
  const provider = process.env.AI_PROVIDER as Provider;

  if (provider === "groq" || provider === "openrouter") {
    return provider;
  }

  return "openrouter";
}

function getProviderOrder(): Provider[] {
  const preferred = getPreferredProvider();
  const fallback: Provider = preferred === "openrouter" ? "groq" : "openrouter";

  return [preferred, fallback];
}

function getApiConfig(provider: Provider) {
  if (provider === "groq") {
    const key = process.env.GROQ_API_KEY;

    if (!key) {
      throw new Error("Missing GROQ_API_KEY");
    }

    return {
      url: "https://api.groq.com/openai/v1/chat/completions",
      key,
      model: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
    };
  }

  const key = process.env.OPENROUTER_API_KEY;

  if (!key) {
    throw new Error("Missing OPENROUTER_API_KEY");
  }

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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = REQUEST_TIMEOUT_MS
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("AI request timed out. Please try again.");
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function buildHeaders(provider: Provider, key: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${key}`,
  };

  if (provider === "openrouter") {
    headers["HTTP-Referer"] =
      process.env.NEXT_PUBLIC_SITE_URL || "https://onlinetoolsbase.com";
    headers["X-Title"] = "OnlineToolsBase AI Tools";
  }

  return headers;
}

async function callProvider(provider: Provider, prompt: string) {
  const config = getApiConfig(provider);

  const response = await fetchWithTimeout(config.url, {
    method: "POST",
    headers: buildHeaders(provider, config.key),
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

  let data: any;

  try {
    data = await response.json();
  } catch {
    throw new Error(`${provider} returned invalid JSON.`);
  }

  if (!response.ok) {
    throw new Error(
      data?.error?.message ||
        data?.message ||
        `${provider} request failed with status ${response.status}.`
    );
  }

  const result = data?.choices?.[0]?.message?.content;

  if (!result || typeof result !== "string") {
    throw new Error(`${provider} returned an empty response.`);
  }

  return {
    provider,
    result,
  };
}

async function runWithFailover(prompt: string) {
  const providers = getProviderOrder();
  const errors: string[] = [];

  for (const provider of providers) {
    for (let attempt = 1; attempt <= MAX_RETRIES_PER_PROVIDER; attempt++) {
      try {
        return await callProvider(provider, prompt);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown provider error";

        console.error(
          `[AI_PROVIDER_FAILED] provider=${provider} attempt=${attempt}`,
          message
        );

        errors.push(`${provider} attempt ${attempt}: ${message}`);

        if (attempt < MAX_RETRIES_PER_PROVIDER) {
          await sleep(700 * attempt);
        }
      }
    }
  }

  throw new Error(
    `All AI providers failed. Last error: ${
      errors[errors.length - 1] || "Unknown error"
    }`
  );
}

export async function POST(req: Request) {
  try {
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        {
          ok: false,
          code: "INVALID_JSON",
          error: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const parsed = AiRunSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          ok: false,
          code: "INVALID_REQUEST",
          error: parsed.error.issues[0]?.message || "Invalid request.",
        },
        { status: 400 }
      );
    }

    const { prompt, toolSlug } = parsed.data;

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
      return Response.json(
        {
          ok: false,
          code: userId ? "UPGRADE_REQUIRED" : "LOGIN_REQUIRED",
          message: userId
            ? "You have reached your free daily limit. Upgrade to continue."
            : "You have reached your guest free limit. Sign in to continue.",
          usageCount: currentCount,
          limit,
        },
        { status: 429 }
      );
    }

    const aiResponse = await runWithFailover(prompt);

    await incrementUsage({
      userId: userId || undefined,
      guestId,
      toolSlug,
    });

    return Response.json({
      ok: true,
      result: aiResponse.result,
      provider: aiResponse.provider,
      usageCount: currentCount + 1,
      limit,
    });
  } catch (error) {
    console.error("[AI_RUN_ROUTE_ERROR]", error);

    return Response.json(
      {
        ok: false,
        code: "AI_RUN_FAILED",
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error. Please try again.",
      },
      { status: 500 }
    );
  }
}