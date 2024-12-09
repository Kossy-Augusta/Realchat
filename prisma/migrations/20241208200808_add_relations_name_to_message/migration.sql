/*
  Warnings:

  - You are about to drop the column `user_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `reciever_id` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_user_id_fkey`;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `user_id`,
    ADD COLUMN `reciever_id` INTEGER NOT NULL,
    ADD COLUMN `sender_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_reciever_id_fkey` FOREIGN KEY (`reciever_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
