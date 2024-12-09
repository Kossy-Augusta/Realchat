/*
  Warnings:

  - You are about to alter the column `message_type` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `content` on the `messages` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `messages` MODIFY `message_type` ENUM('TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT') NOT NULL DEFAULT 'TEXT',
    MODIFY `content` VARCHAR(191) NOT NULL;

