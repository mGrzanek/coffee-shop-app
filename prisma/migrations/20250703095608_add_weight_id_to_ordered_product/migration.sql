/*
  Warnings:

  - You are about to drop the column `productName` on the `orderedproduct` table. All the data in the column will be lost.
  - You are about to drop the column `productWeight` on the `orderedproduct` table. All the data in the column will be lost.
  - Added the required column `weightId` to the `OrderedProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderedproduct` DROP FOREIGN KEY `OrderedProduct_orderId_fkey`;

-- AlterTable
ALTER TABLE `orderedproduct` DROP COLUMN `productName`,
    DROP COLUMN `productWeight`,
    ADD COLUMN `weightId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderedProduct` ADD CONSTRAINT `OrderedProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderedProduct` ADD CONSTRAINT `OrderedProduct_weightId_fkey` FOREIGN KEY (`weightId`) REFERENCES `Weight`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderedProduct` ADD CONSTRAINT `OrderedProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
