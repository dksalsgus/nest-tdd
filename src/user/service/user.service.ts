import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUser } from '../model/create-user';
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

  async createUser(createUser: CreateUser): Promise<number> {
    //TODO: transaction

    const userId = await this.userRepository.createUser(createUser);
    const title = `${createUser.email} 생성`;
    await this.userLogRepository.createUserLog({ title, userId });

    return userId;
  }
}
