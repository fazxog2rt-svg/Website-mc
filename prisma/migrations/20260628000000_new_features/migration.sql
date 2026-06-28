-- IslandVote
CREATE TABLE "IslandVote" (
    "id" TEXT NOT NULL,
    "islandId" TEXT NOT NULL,
    "voterIp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IslandVote_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "IslandVote_islandId_voterIp_key" ON "IslandVote"("islandId", "voterIp");
ALTER TABLE "IslandVote" ADD CONSTRAINT "IslandVote_islandId_fkey" FOREIGN KEY ("islandId") REFERENCES "IslandShowcase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ForumThread
CREATE TABLE "ForumThread" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'General',
    "authorName" TEXT NOT NULL,
    "authorUUID" TEXT,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ForumThread_pkey" PRIMARY KEY ("id")
);

-- ForumReply
CREATE TABLE "ForumReply" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorUUID" TEXT,
    "isStaff" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ForumReply_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "ForumReply" ADD CONSTRAINT "ForumReply_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "ForumThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- BazaarPriceHistory
CREATE TABLE "BazaarPriceHistory" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "volume" INTEGER NOT NULL DEFAULT 0,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BazaarPriceHistory_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "BazaarPriceHistory_itemId_idx" ON "BazaarPriceHistory"("itemId");

-- PushSubscription
CREATE TABLE "PushSubscription" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dhKey" TEXT NOT NULL,
    "authKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PushSubscription_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "PushSubscription_endpoint_key" ON "PushSubscription"("endpoint");
