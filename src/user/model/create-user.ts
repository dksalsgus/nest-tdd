import { Prisma } from '@prisma/client';

export interface CreateUser
  extends Pick<Prisma.UserCreateInput, 'email' | 'name' | 'password'> {}
