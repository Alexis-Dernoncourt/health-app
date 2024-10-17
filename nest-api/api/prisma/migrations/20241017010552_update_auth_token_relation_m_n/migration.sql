/*
  Warnings:

  - You are about to drop the column `tokenable_id` on the `auth_access_token` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "auth_access_token" DROP CONSTRAINT "auth_access_token_tokenable_id_fkey";

-- DropIndex
DROP INDEX "auth_access_token_tokenable_id_key";

-- AlterTable
ALTER TABLE "auth_access_token" DROP COLUMN "tokenable_id";

-- CreateTable
CREATE TABLE "_auth_access_tokenTousers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_auth_access_tokenTousers_AB_unique" ON "_auth_access_tokenTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_auth_access_tokenTousers_B_index" ON "_auth_access_tokenTousers"("B");

-- AddForeignKey
ALTER TABLE "_auth_access_tokenTousers" ADD CONSTRAINT "_auth_access_tokenTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "auth_access_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_auth_access_tokenTousers" ADD CONSTRAINT "_auth_access_tokenTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
