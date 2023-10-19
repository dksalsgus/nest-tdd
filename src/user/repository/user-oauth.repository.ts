import { Injectable } from '@nestjs/common';
import { UserOauth } from '@prisma/client';
import {
  PrismaService,
  PrismaTransaction,
} from '../../prisma/service/prisma.service';

@Injectable()
export class UserOauthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createData: Create, trx: PrismaTransaction): Promise<number> {
    const query = trx.userOauth.create({
      data: createData,
    });
    const result = await query;
    return result.id;
  }
}

type Create = Pick<UserOauth, 'service_name' | 'user_id'>;
