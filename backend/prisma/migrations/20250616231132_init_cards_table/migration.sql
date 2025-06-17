-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "author" TEXT,
    "imgSrc" TEXT NOT NULL,
    "imgAlt" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "pinDate" TIMESTAMP(3),

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
