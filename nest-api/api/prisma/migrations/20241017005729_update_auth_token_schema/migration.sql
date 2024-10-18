/*
  Warnings:

  - You are about to drop the `_auth_access_tokenTousers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[tokenable_id]` on the table `auth_access_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_auth_access_tokenTousers" DROP CONSTRAINT "_auth_access_tokenTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_auth_access_tokenTousers" DROP CONSTRAINT "_auth_access_tokenTousers_B_fkey";

-- AlterTable
ALTER TABLE "auth_access_token" ADD COLUMN     "tokenable_id" TEXT,
ALTER COLUMN "expires_at" DROP DEFAULT,
ALTER COLUMN "expires_at" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_auth_access_tokenTousers";

-- CreateIndex
CREATE UNIQUE INDEX "auth_access_token_tokenable_id_key" ON "auth_access_token"("tokenable_id");

-- AddForeignKey
ALTER TABLE "auth_access_token" ADD CONSTRAINT "auth_access_token_tokenable_id_fkey" FOREIGN KEY ("tokenable_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
