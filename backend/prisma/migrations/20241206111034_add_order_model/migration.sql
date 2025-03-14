/*
  Warnings:

  - You are about to drop the column `optionA` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `optionB` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `optionC` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `optionD` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `ticket` on the `Reward` table. All the data in the column will be lost.
  - Added the required column `option1` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option2` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option3` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option4` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "optionA",
DROP COLUMN "optionB",
DROP COLUMN "optionC",
DROP COLUMN "optionD",
ADD COLUMN     "option1" TEXT NOT NULL,
ADD COLUMN     "option2" TEXT NOT NULL,
ADD COLUMN     "option3" TEXT NOT NULL,
ADD COLUMN     "option4" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reward" DROP COLUMN "ticket";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referralCode" TEXT,
ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY['user']::TEXT[];

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invoiceId" TEXT NOT NULL,
    "productname" TEXT NOT NULL,
    "rewardname" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "ticketId" TEXT[],

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
