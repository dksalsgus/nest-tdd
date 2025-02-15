import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/service/prisma.service';
import { UserModule } from './user/user.module';
import { UserFoodModule } from './userFood/user-food.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('prod', 'dev', 'debug').required(),
        SERVER_URL: Joi.string().not().empty().required(),
        DATABASE_URL: Joi.string().not().empty().required(),
        NAVER_CLIENT_ID: Joi.string().not().empty().required(),
        NAVER_SECRET: Joi.string().not().empty().required(),
        JWT_SECRET: Joi.string().not().empty().required(),
      }),
    }),
    CommonModule,
    UserModule,
    PrismaModule,
    AuthModule,
    UserFoodModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [],
})
export class AppModule {}
