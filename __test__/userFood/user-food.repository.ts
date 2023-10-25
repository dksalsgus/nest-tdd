import { Injectable } from '@nestjs/common';
import { UserFood } from '@prisma/client';
import {
  PrismaService,
  PrismaTransaction,
} from '../../src/prisma/service/prisma.service';

@Injectable()
export class UserFoodRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getList(userId: number) {
    const list = await this.prismaService.userFood.findMany({
      where: { user_id: userId },
    });
    return list;
  }

  async createUserFood(
    createUserFood: Create,
    trx: PrismaTransaction,
  ): Promise<number> {
    const result = await trx.userFood.create({
      select: {
        id: true,
      },
      data: createUserFood,
    });
    return result.id;
  }

  async findFoodById(foodId: number): Promise<FindFoodById> {
    const food = await this.prismaService.userFood.findFirst({
      select: { id: true, name: true },
      where: { id: foodId },
    });
    return food;
  }

  async updateFood(
    foodId: number,
    updateFood: UpdateFood,
    trx: PrismaTransaction,
  ): Promise<void> {
    const result = await trx.userFood.update({
      data: updateFood,
      where: { id: foodId },
    });
  }
}

type Create = Pick<UserFood, 'name' | 'user_id'>;
type FindFoodById = Pick<UserFood, 'id' | 'name'>;

type UpdateFood = Pick<UserFood, 'name'>;
