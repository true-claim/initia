-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "week_01" BOOLEAN NOT NULL DEFAULT false,
    "week_02" BOOLEAN NOT NULL DEFAULT false,
    "week_03" BOOLEAN NOT NULL DEFAULT false,
    "week_04" BOOLEAN NOT NULL DEFAULT false,
    "week_05" BOOLEAN NOT NULL DEFAULT false,
    "week_06" BOOLEAN NOT NULL DEFAULT false,
    "week_07" BOOLEAN NOT NULL DEFAULT false,
    "week_08" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Status_id_fkey" FOREIGN KEY ("id") REFERENCES "Jennie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Status" ("id", "week_01", "week_02", "week_03", "week_04", "week_05", "week_06", "week_07", "week_08") SELECT "id", coalesce("week_01", false) AS "week_01", coalesce("week_02", false) AS "week_02", coalesce("week_03", false) AS "week_03", coalesce("week_04", false) AS "week_04", coalesce("week_05", false) AS "week_05", coalesce("week_06", false) AS "week_06", coalesce("week_07", false) AS "week_07", coalesce("week_08", false) AS "week_08" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
PRAGMA foreign_key_check("Status");
PRAGMA foreign_keys=ON;
