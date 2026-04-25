-- CreateTable
CREATE TABLE "ToolUsage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "guestId" TEXT,
    "toolSlug" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "usageDate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "ToolUsage_userId_toolSlug_usageDate_idx" ON "ToolUsage"("userId", "toolSlug", "usageDate");

-- CreateIndex
CREATE INDEX "ToolUsage_guestId_toolSlug_usageDate_idx" ON "ToolUsage"("guestId", "toolSlug", "usageDate");
