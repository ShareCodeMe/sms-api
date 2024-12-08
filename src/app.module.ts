import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth';
import { LoggerService } from 'src/common/middleware/logger.service';
import { ErrorLoggingMiddleware } from 'src/common/middleware/error-loggin.middleware';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, LessonsModule],
  providers: [LoggerService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ErrorLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
