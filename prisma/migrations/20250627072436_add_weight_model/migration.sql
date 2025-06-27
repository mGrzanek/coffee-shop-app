/*
  Warnings:

  - You are about to drop the column `weight` on the `cartitem` table. All the data in the column will be lost.
  - Added the required column `weightId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `weight`,
    ADD COLUMN `weightId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Weight` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `multiplier` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_weightId_fkey` FOREIGN KEY (`weightId`) REFERENCES `Weight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
