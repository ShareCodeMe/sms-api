import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ description: 'Name of the lesson', minLength: 3 })
  @MinLength(3, { message: 'Name Min 3 Character' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Teacher of the lesson', minLength: 4 })
  @MinLength(4, { message: 'Select Teacher' })
  @IsString()
  teacher: string;

  @ApiProperty({
    description: 'Subject of the lesson',
    example: 'MATH',
  })
  @IsString()
  @IsNotEmpty({ message: 'Subject is required' })
  subject: string;
}
