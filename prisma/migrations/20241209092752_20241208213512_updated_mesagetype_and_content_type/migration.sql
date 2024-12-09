/*
  Warnings:

  - You are about to drop the `_chattouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_chattouser` DROP FOREIGN KEY `_ChatToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_chattouser` DROP FOREIGN KEY `_ChatToUser_B_fkey`;

-- AlterTable
ALTER TABLE `messages` MODIFY `content` TEXT NULL;

-- DropTable
DROP TABLE `_chattouser`;

-- CreateTable
CREATE TABLE `chatstousers` (
    `user_id` INTEGER NOT NULL,
    `chat_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `chat_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chatstousers` ADD CONSTRAINT `chatstousers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chatstousers` ADD CONSTRAINT `chatstousers_chat_id_fkey` FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
