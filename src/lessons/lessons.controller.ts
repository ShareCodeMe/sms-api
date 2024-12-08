import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  BadRequestException,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Protocol } from '../common/decorators/protocol.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@ApiTags('lessons')
@Controller({ path: 'lessons', version: '1' })
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @ApiOperation({ summary: 'Retrieve all lessons' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all lessons.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<any> {
    try {
      return await this.lessonsService.findAll(paginationQuery);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Retrieve a lesson by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the lesson to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the lesson.',
  })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any | null> {
    try {
      return await this.lessonsService.findOne(id);
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiBody({
    description: 'The data to create a new lesson',
    type: CreateLessonDto,
  })
  @ApiResponse({ status: 201, description: 'Successfully created the lesson.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createLessonDto: CreateLessonDto): Promise<any> {
    try {
      return await this.lessonsService.create(createLessonDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Update a lesson by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the lesson to update' })
  @ApiBody({
    description: 'The data to update the lesson',
    type: UpdateLessonDto,
  })
  @ApiResponse({ status: 200, description: 'Successfully updated the lesson.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<any> {
    try {
      return await this.lessonsService.update(id, updateLessonDto);
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a lesson by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the lesson to delete' })
  @ApiResponse({ status: 200, description: 'Successfully deleted the lesson.' })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    try {
      return await this.lessonsService.delete(id);
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
