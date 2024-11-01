/*
  Warnings:

  - You are about to drop the `_recipesTouser_favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_favoritesTousers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_recipesTouser_favorites" DROP CONSTRAINT "_recipesTouser_favorites_A_fkey";

-- DropForeignKey
ALTER TABLE "_recipesTouser_favorites" DROP CONSTRAINT "_recipesTouser_favorites_B_fkey";

-- DropForeignKey
ALTER TABLE "_user_favoritesTousers" DROP CONSTRAINT "_user_favoritesTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_favoritesTousers" DROP CONSTRAINT "_user_favoritesTousers_B_fkey";

-- AlterTable
ALTER TABLE "user_favorites" ADD COLUMN     "recipe_id" TEXT,
ADD COLUMN     "user_id" TEXT;

-- DropTable
DROP TABLE "_recipesTouser_favorites";

-- DropTable
DROP TABLE "_user_favoritesTousers";

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
