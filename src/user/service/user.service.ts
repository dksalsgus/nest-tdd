import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUser } from '../model/create-user';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getListUser(): Promise<User[]> {
    const list = await this.userRepository.getListUser();
    return list;
  }

  async createUser(): Promise<number> {
    const user: CreateUser = {
      email: 'test@email.com',
      password: '1234',
      name: '테스트',
    };
    const result = await this.userRepository.createUser(user);
    return result;
  }
}
