import { Request, Response, NextFunction } from 'express';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { CommonModule } from './common/common.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppsModule implements NestModule {
  constructor(private readonly configService: ConfigService) {
    // comment just to avoid lint error
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction): any => {
        const middleware = new LoggerMiddleware(this.configService);
        middleware.use(req, res, next);
      })
      .forRoutes('*');
  }
}
