/*
  Warnings:

  - Changed the type of `ingredients` on the `recipes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `steps` on the `recipes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT NULL,
DROP COLUMN "steps",
ADD COLUMN     "steps" TEXT NULL;
