import { Module } from '@nestjs/common';
import { LoginOauthController } from './controller/login-oauth.controller';
import { LoginController } from './controller/login.controller';
import { AuthService } from './service/auth.service';
import { NaverOauthService } from './service/naver-oauth.service';

@Module({
  imports: [],
  providers: [AuthService, NaverOauthService],
  controllers: [LoginController, LoginOauthController],
})
export class AuthModule {}
