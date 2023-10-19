import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserLogRepository } from './repository/user-log.repository';
import { UserOauthRepository } from './repository/user-oauth.repository';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  providers: [
    UserRepository,
    UserService,
    UserLogRepository,
    UserOauthRepository,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    UserRepository,
    UserLogRepository,
    UserOauthRepository,
  ],
})
export class UserModule {}
