/*
  Warnings:

  - You are about to drop the column `active` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `order` table. All the data in the column will be lost.
  - Added the required column `products` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_cartId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `active`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `cartId`,
    ADD COLUMN `products` JSON NOT NULL;
