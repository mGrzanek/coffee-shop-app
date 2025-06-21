/*
  Warnings:

  - You are about to drop the column `cartId` on the `order` table. All the data in the column will be lost.
  - Added the required column `deliveryPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_cartId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `cartId`,
    ADD COLUMN `deliveryPrice` DOUBLE NOT NULL,
    ALTER COLUMN `totalPrice` DROP DEFAULT;

-- CreateTable
CREATE TABLE `OrderProducts` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `productAmount` INTEGER NOT NULL,
    `weight` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderProducts` ADD CONSTRAINT `OrderProducts_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
