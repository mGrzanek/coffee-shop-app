/*
  Warnings:

  - You are about to alter the column `totalPrice` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `cart` MODIFY `totalPrice` DOUBLE NOT NULL DEFAULT 0;
