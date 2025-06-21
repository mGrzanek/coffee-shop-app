/*
  Warnings:

  - You are about to drop the `orderproducts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `orderId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `orderproducts`;

-- CreateIndex
CREATE UNIQUE INDEX `Cart_orderId_key` ON `Cart`(`orderId`);

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
