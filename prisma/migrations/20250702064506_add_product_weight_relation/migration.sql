/*
  Warnings:

  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cartitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientEmail` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPhone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientSurname` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryCost` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productsPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_weightId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `userId`,
    ADD COLUMN `clientAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientName` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientSurname` VARCHAR(191) NOT NULL,
    ADD COLUMN `deliveryCost` INTEGER NOT NULL,
    ADD COLUMN `productsPrice` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `cart`;

-- DropTable
DROP TABLE `cartitem`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `_ProductWeights` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProductWeights_AB_unique`(`A`, `B`),
    INDEX `_ProductWeights_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductWeights` ADD CONSTRAINT `_ProductWeights_A_fkey` FOREIGN KEY (`A`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductWeights` ADD CONSTRAINT `_ProductWeights_B_fkey` FOREIGN KEY (`B`) REFERENCES `Weight`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
