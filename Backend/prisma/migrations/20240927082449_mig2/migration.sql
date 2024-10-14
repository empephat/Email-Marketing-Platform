/*
  Warnings:

  - You are about to drop the column `CompanyName` on the `Campaign` table. All the data in the column will be lost.
  - Added the required column `campaignName` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Campaign_CompanyName_key";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "CompanyName",
ADD COLUMN     "campaignName" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL;
