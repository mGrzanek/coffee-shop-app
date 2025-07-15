/*
  Warnings:

  - Made the column `address` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `address` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `phone` VARCHAR(191) NOT NULL DEFAULT '';
