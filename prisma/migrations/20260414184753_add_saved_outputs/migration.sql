-- CreateTable
CREATE TABLE "SavedOutput" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "toolSlug" TEXT NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "SavedOutput_userId_toolSlug_idx" ON "SavedOutput"("userId", "toolSlug");

-- CreateIndex
CREATE INDEX "SavedOutput_userId_createdAt_idx" ON "SavedOutput"("userId", "createdAt");
