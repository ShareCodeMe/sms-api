import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return await this.prismaService.lessons.findMany({
      orderBy: { name: 'asc' },
      include: {
        teacher: { select: { name: true } },
        subject: { select: { name: true } },
      },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string) {
    const lesson = await this.prismaService.lessons.findUnique({
      where: { id },
      include: {
        teacher: { select: { name: true } },
        subject: { select: { name: true } },
      },
    });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async create(createLessonDto: CreateLessonDto) {
    const { name, teacher, subject } = createLessonDto;
    const teachers = await this.prismaService.teachers.findFirst({
      where: { name: teacher },
    });
    const subjects = await this.prismaService.subject.findFirst({
      where: { name: subject },
    });
    if (!teachers) {
      throw new NotFoundException(`Teacher with name ${teacher} not found`);
    } else if (!subjects) {
      throw new NotFoundException(`Subject with name ${subject} not found`);
    }
    return await this.prismaService.lessons.create({
      data: {
        name,
        teacherId: teachers.id,
        subjectId: subjects.id,
      },
    });
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const { name, teacher, subject } = updateLessonDto;
    const teachers = await this.prismaService.teachers.findFirst({
      where: { name: teacher },
    });
    const subjects = await this.prismaService.subject.findFirst({
      where: { name: subject },
    });
    if (!teachers) {
      throw new NotFoundException(`Teacher with name ${teacher} not found`);
    } else if (!subjects) {
      throw new NotFoundException(`Subject with name ${subject} not found`);
    }
    const lesson = await this.prismaService.lessons.update({
      where: { id },
      data: {
        name,
        teacherId: teachers.id,
        subjectId: subjects.id,
      },
    });
    if (!lesson) {
      new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async delete(id: string) {
    const lesson = await this.prismaService.lessons.delete({ where: { id } });
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }
}
