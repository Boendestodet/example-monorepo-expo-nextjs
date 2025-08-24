/*
  Warnings:

  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- First add the columns as nullable
ALTER TABLE `User` ADD COLUMN `emailVerified` DATETIME(3) NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NULL;

-- Set a default password hash for existing users (you should change this in production)
-- This is a placeholder hash - in production, you'd want to either:
-- 1. Force users to reset their passwords, or
-- 2. Generate proper hashes for existing users
UPDATE `User` SET `passwordHash` = 'placeholder_hash_for_existing_users' WHERE `passwordHash` IS NULL;

-- Now make the passwordHash column required
ALTER TABLE `User` MODIFY COLUMN `passwordHash` VARCHAR(191) NOT NULL;
