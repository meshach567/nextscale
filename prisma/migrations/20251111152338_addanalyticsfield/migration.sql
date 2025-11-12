-- CreateTable
CREATE TABLE "Analytics" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "serviceClicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);
