/*
  Warnings:

  - You are about to alter the column `xp` on the `Jennie` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jennie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seed_phrase" TEXT NOT NULL,
    "address" TEXT,
    "discord_token" TEXT,
    "xp" INTEGER,
    "proxy" TEXT,
    "cookie" TEXT,
    "userAgent" TEXT
);
INSERT INTO "new_Jennie" ("address", "cookie", "discord_token", "id", "proxy", "seed_phrase", "userAgent", "xp") SELECT "address", "cookie", "discord_token", "id", "proxy", "seed_phrase", "userAgent", "xp" FROM "Jennie";
DROP TABLE "Jennie";
ALTER TABLE "new_Jennie" RENAME TO "Jennie";
CREATE UNIQUE INDEX "Jennie_seed_phrase_key" ON "Jennie"("seed_phrase");
PRAGMA foreign_key_check("Jennie");
PRAGMA foreign_keys=ON;
