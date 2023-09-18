import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getListUser(): Promise<User[]> {
    const list = await this.prismaService.user.findMany();
    return list;
  }
}
