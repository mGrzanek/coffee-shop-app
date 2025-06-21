/*
  Warnings:

  - You are about to drop the column `deliveryPrice` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `orderproducts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderproducts` DROP FOREIGN KEY `OrderProducts_orderId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `deliveryPrice`,
    DROP COLUMN `userId`,
    ADD COLUMN `clientId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `orderproducts` DROP COLUMN `orderId`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
