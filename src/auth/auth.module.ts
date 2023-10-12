import { Module } from '@nestjs/common';
import { LoginOauthController } from './controller/login-oauth.controller';
import { LoginController } from './controller/login.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [],
  providers: [AuthService],
  controllers: [LoginController, LoginOauthController],
})
export class AuthModule {}
