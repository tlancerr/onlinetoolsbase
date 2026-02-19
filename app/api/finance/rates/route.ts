import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * GET /api/finance/rates?base=USD&symbols=EUR,GBP
 * Uses Frankfurter (free, no key): https://api.frankfurter.dev/v1/latest
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const base = (searchParams.get("base") || "USD").toUpperCase();
    const symbols = (searchParams.get("symbols") || "EUR").toUpperCase();

    const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(
      base
    )}&symbols=${encodeURIComponent(symbols)}`;

    const r = await fetch(url, {
      // cache on the server to reduce calls; Frankfurter updates daily
      next: { revalidate: 60 * 60 }, // 1 hour
    });

    if (!r.ok) {
      const txt = await r.text().catch(() => "");
      return NextResponse.json(
        { error: `Rates request failed (${r.status})`, details: txt.slice(0, 300) },
        { status: 500 }
      );
    }

    const data = await r.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
