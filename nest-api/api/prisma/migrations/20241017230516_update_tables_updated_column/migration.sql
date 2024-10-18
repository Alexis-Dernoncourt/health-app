-- AlterTable
ALTER TABLE "auth_access_token" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "updatedat" DROP DEFAULT;

-- AlterTable
ALTER TABLE "user_favorites" ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT;
