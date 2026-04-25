import { prisma } from "@/lib/prisma";

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export async function getUsage({
  userId,
  guestId,
  toolSlug,
}: {
  userId?: string;
  guestId?: string;
  toolSlug: string;
}) {
  const usageDate = getTodayKey();

  return prisma.toolUsage.findFirst({
    where: {
      toolSlug,
      usageDate,
      ...(userId ? { userId } : { guestId }),
    },
  });
}

export async function incrementUsage({
  userId,
  guestId,
  toolSlug,
}: {
  userId?: string;
  guestId?: string;
  toolSlug: string;
}) {
  const usageDate = getTodayKey();

  const existing = await getUsage({ userId, guestId, toolSlug });

  if (!existing) {
    return prisma.toolUsage.create({
      data: {
        userId,
        guestId,
        toolSlug,
        usageDate,
        count: 1,
      },
    });
  }

  return prisma.toolUsage.update({
    where: { id: existing.id },
    data: {
      count: { increment: 1 },
    },
  });
}
