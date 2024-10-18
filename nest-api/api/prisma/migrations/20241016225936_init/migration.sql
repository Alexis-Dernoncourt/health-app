-- CreateTable
CREATE TABLE "auth_access_token" (
    "id" TEXT NOT NULL,
    "type" VARCHAR(25) DEFAULT 'auth_token',
    "name" TEXT DEFAULT 'access-token',
    "hash" TEXT NOT NULL,
    "abilities" TEXT NOT NULL DEFAULT '[''user:normal'']',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_access_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT,
    "steps" TEXT,
    "calories" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_auth_access_tokenTousers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_recipesTousers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_recipesTouser_favorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_user_favoritesTousers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_auth_access_tokenTousers_AB_unique" ON "_auth_access_tokenTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_auth_access_tokenTousers_B_index" ON "_auth_access_tokenTousers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_recipesTousers_AB_unique" ON "_recipesTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_recipesTousers_B_index" ON "_recipesTousers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_recipesTouser_favorites_AB_unique" ON "_recipesTouser_favorites"("A", "B");

-- CreateIndex
CREATE INDEX "_recipesTouser_favorites_B_index" ON "_recipesTouser_favorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_user_favoritesTousers_AB_unique" ON "_user_favoritesTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_user_favoritesTousers_B_index" ON "_user_favoritesTousers"("B");

-- AddForeignKey
ALTER TABLE "_auth_access_tokenTousers" ADD CONSTRAINT "_auth_access_tokenTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "auth_access_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_auth_access_tokenTousers" ADD CONSTRAINT "_auth_access_tokenTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipesTousers" ADD CONSTRAINT "_recipesTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipesTousers" ADD CONSTRAINT "_recipesTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipesTouser_favorites" ADD CONSTRAINT "_recipesTouser_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recipesTouser_favorites" ADD CONSTRAINT "_recipesTouser_favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "user_favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_favoritesTousers" ADD CONSTRAINT "_user_favoritesTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "user_favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_favoritesTousers" ADD CONSTRAINT "_user_favoritesTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
