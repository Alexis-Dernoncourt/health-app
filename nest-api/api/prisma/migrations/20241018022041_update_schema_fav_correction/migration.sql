/*
  Warnings:

  - You are about to drop the column `users_who_favorited_ids` on the `recipes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "recipes" DROP CONSTRAINT "recipes_users_who_favorited_ids_fkey";

-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "users_who_favorited_ids";
