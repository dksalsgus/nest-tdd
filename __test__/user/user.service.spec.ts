import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/service/user.service';

describe('User Service Test', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, PrismaService],
    }).compile();
    userRepository = testModule.get<UserRepository>(UserRepository);
    userService = testModule.get<UserService>(UserService);

    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('유저리스트', async () => {
    jest.spyOn(userRepository, 'getListUser').mockImplementation(async () => {
      const testUser: User = {
        id: 1,
        created_at: new Date(),
        email: 'test@email.com',
        name: '테스트',
        password: '1234',
        updated_at: new Date(),
      };
      return [testUser];
    });
    const userList = await userService.getListUser();

    expect(userRepository.getListUser).toHaveBeenCalledTimes(1);
    expect(userList).toHaveLength(1);
  });
});
