import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaService } from 'src/prisma';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, PrismaService],
})
export class LessonsModule {}
