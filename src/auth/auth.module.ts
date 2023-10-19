import { Module } from '@nestjs/common';
import { LoginOauthController } from './controller/login-oauth.controller';
import { LoginController } from './controller/login.controller';
import { NaverOauthRepository } from './repository/naver-oauth.repository';
import { AuthService } from './service/auth.service';
import { NaverOauthProvider } from './service/naver-oauth.service';

@Module({
  imports: [],
  providers: [AuthService, NaverOauthProvider, NaverOauthRepository],
  controllers: [LoginController, LoginOauthController],
})
export class AuthModule {}
