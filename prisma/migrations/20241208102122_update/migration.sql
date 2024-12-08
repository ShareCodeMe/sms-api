/*
  Warnings:

  - You are about to drop the column `cat` on the `Lessons` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "cat",
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "LessonCategory";

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SubjectToTeachers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SubjectToTeachers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SubjectToTeachers_B_index" ON "_SubjectToTeachers"("B");

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeachers" ADD CONSTRAINT "_SubjectToTeachers_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTeachers" ADD CONSTRAINT "_SubjectToTeachers_B_fkey" FOREIGN KEY ("B") REFERENCES "Teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
