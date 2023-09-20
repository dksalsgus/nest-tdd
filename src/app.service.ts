import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/service/prisma.service';

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
}
