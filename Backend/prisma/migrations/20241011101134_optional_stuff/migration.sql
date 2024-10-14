/*
  Warnings:

  - A unique constraint covering the columns `[campaignId]` on the table `Email` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "companyName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Email_campaignId_key" ON "Email"("campaignId");
