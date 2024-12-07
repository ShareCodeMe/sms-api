/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Assignments` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Assignments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Assignments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Attendances` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Attendances` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Attendances` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Classrooms` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Classrooms` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Classrooms` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Parents` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Students` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Teachers` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Teachers` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Teachers` table. All the data in the column will be lost.
  - Made the column `createdAt` on table `Parents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Assignments" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Attendances" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Classrooms" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Parents" DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "day" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Students" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Teachers" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";
