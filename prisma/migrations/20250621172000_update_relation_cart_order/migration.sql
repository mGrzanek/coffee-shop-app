/*
  Warnings:

  - You are about to drop the column `orderId` on the `cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_orderId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `orderId`;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `cartId` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX `Order_cartId_key` ON `Order`(`cartId`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
