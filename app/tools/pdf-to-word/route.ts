import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SECRET = process.env.CONVERTAPI_SECRET;

  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const apiForm = new FormData();
  apiForm.append("File", new Blob([fileBuffer]), file.name);

  const res = await fetch("https://v2.convertapi.com/convert/pdf/to/docx", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
    },
    body: apiForm,
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json(
      { error: "ConvertAPI error", details: err },
      { status: res.status }
    );
  }

  const converted = await res.arrayBuffer();

  return new NextResponse(converted, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="converted.docx"',
    },
  });
}
