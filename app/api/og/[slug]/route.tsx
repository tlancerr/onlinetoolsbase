import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request, context: any) {
  // 🔥 FIX: params is a Promise in Next.js 14 Edge Runtime
  const { slug } = await context.params;

  const title = slug
    ? slug.replace(/-/g, " ").toUpperCase()
    : "TOOL";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 64,
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: 40,
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
