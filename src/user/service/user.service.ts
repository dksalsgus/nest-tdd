import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { RequestCreateUser } from '../model/request/request.create-user';
import { UserLogRepository } from '../repository/user-log.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userLogRepository: UserLogRepository,
  ) {}

  async getListUser(): Promise<User[]> {
    const list = await this.userRepository.getListUser();
    return list;
  }

  async createUser(requestCreateUser: RequestCreateUser): Promise<number> {
    //TODO: transaction
    const prisma = new PrismaClient();

    const { email, name, password } = requestCreateUser;
    const userId = await prisma.$transaction(async (trx) => {
      const userId = await this.userRepository.createUser(
        {
          email,
          password,
          name,
        },
        trx,
      );
      const title = `${requestCreateUser.email} 생성`;
      await this.userLogRepository.createUserLog({ title, userId }, trx);
      return userId;
    });

    return userId;
  }
}
