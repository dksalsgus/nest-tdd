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

  async createUser(): Promise<number> {
    //TODO: transaction
    const user: CreateUser = {
      email: 'test@email.com',
      password: '1234',
      name: '테스트',
    };

    const userId = await this.userRepository.createUser(user);
    const title = `${user.email} 생성`;
    await this.userLogRepository.createUserLog({ title, userId });

    return userId;
  }
}
