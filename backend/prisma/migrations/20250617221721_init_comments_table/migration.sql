-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "author" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);
