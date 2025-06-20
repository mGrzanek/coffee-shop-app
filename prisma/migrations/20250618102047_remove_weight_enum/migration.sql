/*
  Warnings:

  - You are about to alter the column `weight` on the `cartitem` table. The data in that column could be lost. The data in that column will be cast from `Enum("cartitem_weight")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `cartitem` MODIFY `weight` VARCHAR(191) NOT NULL DEFAULT '100';
