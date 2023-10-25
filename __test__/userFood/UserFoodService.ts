import { Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/common/exception/user.exception';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserRepository } from '../../src/user/repository/user.repository';
import { UserFoodRepository } from './UserFoodRepository';

@Injectable()
export class UserFoodService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userFoodRepository: UserFoodRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getList(userId: number): Promise<ResponseUserFood[]> {
    const user = await this.userRepository.findUser(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    const list = await this.userFoodRepository.getList(userId);
    const response: ResponseUserFood[] = list.map((e) => {
      const { id, name } = e;
      return { id, name };
    });
    return response;
  }

  async create(createUserFood: RequestCreateUserFood): Promise<void> {
    const { name, userId } = createUserFood;
    const user = await this.userRepository.findUser(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    const userFoodId = await this.prismaService.$transaction(async (trx) => {
      const userFoodId = await this.userFoodRepository.createUserFood(
        {
          name,
          user_id: userId,
        },
        trx,
      );
      return userFoodId;
    });
  }
}

export interface RequestCreateUserFood {
  name: string;
  userId: number;
}

export interface ResponseUserFood {
  id: number;
  name: string;
}
