import { Injectable } from '@nestjs/common';
import { UserFoodNotFoundException } from 'src/common/exception/user-food.exception';
import { UserNotFoundException } from 'src/common/exception/user.exception';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserRepository } from '../../src/user/repository/user.repository';
import { UserFoodRepository } from './user-food.repository';

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

  async updateFood(
    foodId: number,
    requestUpdateFood: RequestUpdateFood,
  ): Promise<void> {
    const food = await this.userFoodRepository.findFoodById(foodId);
    if (!food) {
      throw new UserFoodNotFoundException();
    }
    await this.prismaService.$transaction(async (trx) => {
      const { name } = requestUpdateFood;
      await this.userFoodRepository.updateFood(foodId, { name }, trx);
    });
  }

  async deleteFood(foodId: number): Promise<void> {
    const food = await this.userFoodRepository.findFoodById(foodId);
    if (!food) {
      throw new UserFoodNotFoundException();
    }

    await this.prismaService.$transaction(async (trx) => {
      await this.userFoodRepository.delete(foodId, trx);
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

export interface RequestUpdateFood {
  name: string;
}
