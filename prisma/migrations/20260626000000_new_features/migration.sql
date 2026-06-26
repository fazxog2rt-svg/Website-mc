-- CreateTable
CREATE TABLE "StaffMember" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "minecraftUUID" TEXT,
    "role" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StaffMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffApplication" (
    "id" TEXT NOT NULL,
    "minecraftUsername" TEXT NOT NULL,
    "discordUsername" TEXT NOT NULL,
    "age" INTEGER,
    "timezone" TEXT,
    "experience" TEXT NOT NULL,
    "whyJoin" TEXT NOT NULL,
    "availability" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BugReport" (
    "id" TEXT NOT NULL,
    "minecraftUsername" TEXT,
    "discordUsername" TEXT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stepsToReproduce" TEXT,
    "severity" TEXT NOT NULL DEFAULT 'MEDIUM',
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BugReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangelogEntry" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'UPDATE',
    "changes" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChangelogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IslandShowcase" (
    "id" TEXT NOT NULL,
    "ownerUsername" TEXT NOT NULL,
    "ownerUUID" TEXT,
    "islandName" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "islandLevel" INTEGER NOT NULL DEFAULT 0,
    "islandValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IslandShowcase_pkey" PRIMARY KEY ("id")
);
