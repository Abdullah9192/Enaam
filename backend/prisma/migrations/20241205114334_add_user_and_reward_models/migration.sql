/*
  Warnings:

  - You are about to drop the column `price` on the `Reward` table. All the data in the column will be lost.
  - You are about to drop the column `rewardId` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `ticket` to the `Reward` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reward` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reward" DROP COLUMN "price",
ADD COLUMN     "ticket" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "rewardId",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "reward" TEXT NOT NULL;
