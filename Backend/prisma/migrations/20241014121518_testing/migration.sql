/*
  Warnings:

  - Made the column `companyName` on table `Campaign` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Email_campaignId_key";

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "targetAudience" SET NOT NULL,
ALTER COLUMN "targetAudience" SET DATA TYPE TEXT,
ALTER COLUMN "companyName" SET NOT NULL;
