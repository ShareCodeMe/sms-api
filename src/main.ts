import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from 'src/common/configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from 'src/common/filters/prisma-exception.filter';
import { CustomExceptionFilter } from 'src/common/filters/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger Api  Documentation
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(swaggerConfig.path, app, document);
  }
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(
    new CustomExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );

  await app.listen(3001);
}
bootstrap();
