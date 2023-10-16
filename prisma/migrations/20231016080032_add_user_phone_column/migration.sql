/*
  Warnings:

  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(40)`.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `title` on the `user_log` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" VARCHAR(30) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "user_log" ALTER COLUMN "title" SET DATA TYPE VARCHAR(50);
