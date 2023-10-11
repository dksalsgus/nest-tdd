import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';

@Module({ imports: [], controllers: [LoginController] })
export class AuthModule {}
