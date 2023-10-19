import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserLogRepository } from './repository/user-log.repository';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  providers: [UserRepository, UserService, UserLogRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
