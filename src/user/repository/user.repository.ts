import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  PrismaService,
  PrismaTransaction,
} from '../../prisma/service/prisma.service';
import { CreateUser } from '../model/create-user';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getListUser(): Promise<User[]> {
    const list = await this.prismaService.user.findMany();
    return list;
  }

  async createUser(
    createUser: CreateUser,
    trx: PrismaTransaction,
  ): Promise<number> {
    const result = await trx.user.create({
      select: { id: true },
      data: createUser,
    });
    return result.id;
  }
}
