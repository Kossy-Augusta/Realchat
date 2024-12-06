-- AlterTable
ALTER TABLE `users` MODIFY `refresh_token` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `picture` VARCHAR(191) NULL DEFAULT '';
