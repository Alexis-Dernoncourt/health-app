/*
  Warnings:

  - Added the required column `userId` to the `recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "userId" TEXT NOT NULL;
