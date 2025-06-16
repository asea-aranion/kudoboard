-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "category" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "imgAlt" TEXT NOT NULL,
    "cardIds" TEXT[],

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
