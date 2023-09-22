import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  PrismaTransaction,
} from 'src/prisma/service/prisma.service';

@Injectable()
export class UserLogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getListUserLog(userId: number) {
    const list = await this.prismaService.userLog.findMany({
      where: { user_id: userId },
    });
    return list;
  }

  async createUserLog(
    createUserLog: CreateUserLog,
    trx: PrismaTransaction,
  ): Promise<void> {
    const { title, userId } = createUserLog;
    const result = await trx.userLog.create({
      data: {
        title,
        user_id: userId,
      },
    });
  }
}

export interface CreateUserLog {
  title: string;
  userId: number;
}
