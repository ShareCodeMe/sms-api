/*
  Warnings:

  - Added the required column `updatedAt` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parents" ADD COLUMN     "deletedAt" TIMESTAMPTZ,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMPTZ,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "Teachers" ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMPTZ,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;
