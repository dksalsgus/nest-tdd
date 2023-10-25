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
}

type Create = Pick<UserFood, 'name' | 'user_id'>;
