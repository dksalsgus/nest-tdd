import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { UserModule } from 'src/user/user.module';
import { LoginOauthController } from './controller/login-oauth.controller';
import { LoginController } from './controller/login.controller';
import { JwtProvider } from './provider/jwt.provider';
import { NaverOauthProvider } from './provider/naver-oauth.provider';
import { NaverOauthRepository } from './repository/naver-oauth.repository';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get('JWT_SECRET');
        return { secret, signOptions: { expiresIn: '60s' } };
      },
    }),
  ],
  providers: [
    AuthService,
    NaverOauthProvider,
    NaverOauthRepository,
    UserService,
    JwtProvider,
  ],
  controllers: [LoginController, LoginOauthController],
  exports: [],
})
export class AuthModule {}
