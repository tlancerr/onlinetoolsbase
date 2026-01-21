import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const SECRET = process.env.CONVERTAPI_SECRET;
  const KID = process.env.CONVERTAPI_KID;

  if (!SECRET || !KID) {
    return NextResponse.json(
      { error: "Missing ConvertAPI environment variables" },
      { status: 500 }
    );
  }

  const payload = {
    Kid: KID,
    ExpiresInSec: 3600, // 1 hour
    ClientIp: "",
  };

  const res = await fetch("https://v2.convertapi.com/token/jwt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SECRET}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "JWT Generation Failed", details: data },
      { status: res.status }
    );
  }

  return NextResponse.json({ token: data.token });
}
