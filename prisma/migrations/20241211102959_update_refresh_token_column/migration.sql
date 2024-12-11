-- AlterTable
ALTER TABLE `messages` MODIFY `reciever_id` INTEGER NULL,
    MODIFY `sender_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `refresh_token` TEXT NOT NULL DEFAULT '';
