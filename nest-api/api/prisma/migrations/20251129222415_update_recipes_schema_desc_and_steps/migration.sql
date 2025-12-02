/*
  Warnings:

  - Made the column `ingredients` on table `recipes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `steps` on table `recipes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "ingredients" SET NOT NULL,
ALTER COLUMN "steps" SET NOT NULL;
