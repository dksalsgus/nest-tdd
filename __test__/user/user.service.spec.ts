/* eslint-disable @typescript-eslint/no-empty-function */
import { Test } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserLogRepository } from 'src/user/repository/user-log.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/service/user.service';

describe('User Service Test', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  let userLogRepository: UserLogRepository;
  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        UserLogRepository,
        PrismaService,
      ],
    }).compile();
    userRepository = testModule.get<UserRepository>(UserRepository);
    userLogRepository = testModule.get<UserLogRepository>(UserLogRepository);
    userService = testModule.get<UserService>(UserService);

    expect(userRepository).toBeDefined();
    expect(userLogRepository).toBeDefined();
    expect(userService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유저 추가', async () => {
    jest.spyOn(userRepository, 'createUser').mockImplementation(async () => {
      return 1;
    });
    jest
      .spyOn(userLogRepository, 'createUserLog')
      .mockImplementation(async () => {
        return undefined;
      });

    const result = await userService.createUser();
    expect(userLogRepository.createUserLog).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
    expect(result).toBe(1);
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
