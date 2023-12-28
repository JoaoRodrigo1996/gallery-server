/*
  Warnings:

  - You are about to drop the column `pictureName` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `pictureUrl` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" DROP COLUMN "pictureName",
ADD COLUMN     "pictureUrl" TEXT NOT NULL;
