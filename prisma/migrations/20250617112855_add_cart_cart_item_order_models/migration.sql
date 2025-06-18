/*
  Warnings:

  - You are about to alter the column `variety` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Enum("product_variety")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `variety` VARCHAR(191) NOT NULL;
