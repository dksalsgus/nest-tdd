import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { RequestCreateUser } from '../model/request/request.create-user';
import { RequestUpdateUser } from '../model/request/request.update-user';
import { UserLogRepository } from '../repository/user-log.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userLogRepository: UserLogRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async getListUser(): Promise<User[]> {
    const list = await this.userRepository.getListUser();
    return list;
  }

  async createUser(requestCreateUser: RequestCreateUser): Promise<number> {
    const { email, name, password } = requestCreateUser;
    const userId = await this.prismaService.$transaction(async (trx) => {
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

  async updateUser(
    userId: number,
    requestUpdateUser: RequestUpdateUser,
  ): Promise<void> {
    await this.userRepository.findUser(userId);
    const { password } = requestUpdateUser;
    await this.prismaService.$transaction(async (trx) => {
      await this.userRepository.updateUser(userId, { password }, trx);
      const title = '유저 정보 수정';
      await this.userLogRepository.createUserLog({ title, userId }, trx);
    });
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findUser(userId);
    if (!user) {
      throw new NotFoundException();
    }

    await this.prismaService.$transaction(async (trx) => {
      await this.userRepository.deleteUser(userId, trx);
      await this.userLogRepository.createUserLog(
        { title: '유저 삭제', userId },
        trx,
      );
    });
  }

  async findUser(userId: number): Promise<number> {
    const id = await this.userRepository.findUser(userId);
    return id;
  }
}
