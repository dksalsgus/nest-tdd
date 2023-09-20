import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports: [],
  providers: [UserRepository, UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
