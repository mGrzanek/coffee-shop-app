/*
  Warnings:

  - Added the required column `icon` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `icon` VARCHAR(191) NOT NULL;
