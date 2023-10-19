import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { LoginOauthController } from './controller/login-oauth.controller';
import { LoginController } from './controller/login.controller';
import { NaverOauthProvider } from './provider/naver-oauth.provider';
import { NaverOauthRepository } from './repository/naver-oauth.repository';
import { AuthService } from './service/auth.service';

@Module({
  imports: [UserModule],
  providers: [
    AuthService,
    NaverOauthProvider,
    NaverOauthRepository,
    UserRepository,
  ],
  controllers: [LoginController, LoginOauthController],
})
export class AuthModule {}
