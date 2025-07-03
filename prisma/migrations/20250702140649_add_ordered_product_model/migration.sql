/*
  Warnings:

  - You are about to drop the column `deliveryCost` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `products` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `deliveryCost`,
    DROP COLUMN `products`;

-- CreateTable
CREATE TABLE `OrderedProduct` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productAmount` INTEGER NOT NULL,
    `productSinglePrice` DOUBLE NOT NULL,
    `productPrice` DOUBLE NOT NULL,
    `productWeight` INTEGER NOT NULL,
    `optionalMessage` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderedProduct` ADD CONSTRAINT `OrderedProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
