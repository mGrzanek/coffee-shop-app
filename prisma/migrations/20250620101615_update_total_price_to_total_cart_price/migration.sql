/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `totalPrice`,
    ADD COLUMN `totalCartPrice` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `totalPrice` DOUBLE NOT NULL DEFAULT 0;
