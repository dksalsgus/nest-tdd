/* eslint-disable @typescript-eslint/no-empty-function */
import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { RequestCreateUser } from 'src/user/model/request/request.create-user';
import { RequestUpdateUser } from 'src/user/model/request/request.update-user';
import { UpdateUser } from 'src/user/model/update-user';
import { UserLogRepository } from 'src/user/repository/user-log.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/service/user.service';

export const prismaMock = {
  entity: { findUnique: jest.fn() },
  $transaction: jest
    .fn()
    .mockImplementation((callback) => callback(prismaMock)),
};

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

  const createUser: RequestCreateUser = {
    email: 'test@email.com',
    password: '1234',
    name: '테스트',
  };

  it('유저 추가', async () => {
    jest.spyOn(userRepository, 'createUser').mockImplementation(async () => {
      return 1;
    });
    jest
      .spyOn(userLogRepository, 'createUserLog')
      .mockImplementation(async () => {
        return undefined;
      });

    const result = await userService.createUser(createUser);
    expect(userLogRepository.createUserLog).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
    expect(result).toBe(1);
  });

  it('유저리스트', async () => {
    jest.spyOn(userRepository, 'getListUser').mockImplementation(async () => {
      return [
        {
          id: 1,
          email: createUser.email,
          name: createUser.name,
          password: createUser.password,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
    });
    const userList = await userService.getListUser();

    expect(userRepository.getListUser).toHaveBeenCalledTimes(1);
    expect(userList).toHaveLength(1);
    expect.arrayContaining(expect.objectContaining(createUser));
  });

  describe('유저 정보 수정', () => {
    const requestUpdateUser: RequestUpdateUser = { password: '3456' };
    const { password } = requestUpdateUser;
    const updateUser: UpdateUser = { password };
    const userId = 1;
    const prisma = new PrismaClient();

    it('유저 존재하지 않는경우', async () => {
      jest.spyOn(userRepository, 'findUser').mockImplementation(async () => {
        throw new NotFoundException();
      });

      await expect(
        userService.updateUser(userId, updateUser),
      ).rejects.toThrowError(NotFoundException);

      expect(userRepository.findUser).toHaveBeenCalledTimes(1);
      expect(userRepository.findUser).toHaveBeenCalledWith(userId);
    });

    it('유저 정보수정 정상', async () => {
      jest.spyOn(userRepository, 'findUser').mockImplementation(async () => {
        return 1;
      });

      jest
        .spyOn(userRepository, 'updateUser')
        .mockImplementation(async () => {});

      jest
        .spyOn(userLogRepository, 'createUserLog')
        .mockImplementation(async () => {});

      const { password } = requestUpdateUser;
      await userService.updateUser(userId, { password });
      expect(userRepository.findUser).toHaveBeenCalledTimes(1);
      expect(userRepository.findUser).toHaveBeenCalledWith(userId);
      expect(userRepository.updateUser).toHaveBeenCalledTimes(1);
      expect(userLogRepository.createUserLog).toHaveBeenCalledTimes(1);
    });
  });

  describe('유저 삭제', () => {
    const userId = 1;
    it('유저가 없는경우', async () => {
      jest.spyOn(userRepository, 'findUser').mockImplementation(() => {
        throw new NotFoundException();
      });
      await expect(userService.deleteUser(userId)).rejects.toThrowError(
        NotFoundException,
      );

      expect(userRepository.findUser).toHaveBeenCalledTimes(1);
    });

    it('삭제 성공', async () => {
      jest
        .spyOn(userRepository, 'findUser')
        .mockImplementation(async () => userId);

      jest
        .spyOn(userRepository, 'deleteUser')
        .mockImplementation(async () => {});

      jest
        .spyOn(userLogRepository, 'createUserLog')
        .mockImplementation(async () => {});

      await userService.deleteUser(userId);

      expect(userRepository.findUser).toHaveBeenCalledTimes(1);
      expect(userRepository.deleteUser).toHaveBeenCalledTimes(1);
      expect(userLogRepository.createUserLog).toHaveBeenCalledTimes(1);
    });
  });
});
