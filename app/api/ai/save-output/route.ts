import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        {
          ok: false,
          code: "LOGIN_REQUIRED",
          error: "You must be signed in to save outputs.",
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { toolSlug, input, output } = body;

    if (!toolSlug || !input || !output) {
      return Response.json(
        {
          ok: false,
          error: "toolSlug, input, and output are required.",
        },
        { status: 400 }
      );
    }

    const saved = await prisma.savedOutput.create({
      data: {
        userId,
        toolSlug,
        input,
        output,
      },
    });

    return Response.json({
      ok: true,
      saved,
    });
  } catch (error) {
    console.error("Save output error:", error);

    return Response.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Unexpected server error",
      },
      { status: 500 }
    );
  }
}
