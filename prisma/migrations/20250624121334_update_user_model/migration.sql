/*
  Warnings:

  - Added the required column `cartId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `cartId` VARCHAR(191) NOT NULL;
