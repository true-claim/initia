/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Jennie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Jennie_address_key" ON "Jennie"("address");
