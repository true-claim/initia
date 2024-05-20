/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Jennie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seed_phrase" TEXT NOT NULL,
    "proxy" TEXT,
    "cookie" TEXT,
    "userAgent" TEXT,
    "discord_token" TEXT
);

-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "week_01" BOOLEAN DEFAULT false,
    "week_02" BOOLEAN DEFAULT false,
    "week_03" BOOLEAN DEFAULT false,
    "week_04" BOOLEAN DEFAULT false,
    "week_05" BOOLEAN DEFAULT false,
    "week_06" BOOLEAN DEFAULT false,
    "week_07" BOOLEAN DEFAULT false,
    "week_08" BOOLEAN DEFAULT false,
    CONSTRAINT "Status_id_fkey" FOREIGN KEY ("id") REFERENCES "Jennie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Jennie_seed_phrase_key" ON "Jennie"("seed_phrase");

-- CreateIndex
CREATE UNIQUE INDEX "Jennie_discord_token_key" ON "Jennie"("discord_token");
