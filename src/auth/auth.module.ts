import { Module } from '@nestjs/common';
import { LoginController } from './controller/login.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [],
  providers: [AuthService],
  controllers: [LoginController],
})
export class AuthModule {}
