import { Injectable } from '@nestjs/common';
import { Test, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getListUser(): Promise<User[]> {
    const list: User[] = await this.prismaService.user.findMany();
    return list;
  }

  async getListTest(): Promise<Test[]> {
    const testList = await this.prismaService.test.findMany();
    return testList;
  }
}
