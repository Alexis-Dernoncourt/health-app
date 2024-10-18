/*
  Warnings:

  - You are about to drop the `_recipesTousers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_recipesTousers" DROP CONSTRAINT "_recipesTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_recipesTousers" DROP CONSTRAINT "_recipesTousers_B_fkey";

-- AlterTable
ALTER TABLE "recipes" ADD COLUMN     "users_who_favorited_ids" TEXT;

-- DropTable
DROP TABLE "_recipesTousers";

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_users_who_favorited_ids_fkey" FOREIGN KEY ("users_who_favorited_ids") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
