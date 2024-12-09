/*
  Warnings:

  - Added the required column `content` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Made the column `status_flag` on table `messages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `messages` ADD COLUMN `content` ENUM('TEXT', 'IMAGE', 'VIDEO', 'AUDIO', 'DOCUMENT') NOT NULL,
    MODIFY `status_flag` ENUM('SENT', 'DELIVERED', 'READ') NOT NULL DEFAULT 'SENT';

