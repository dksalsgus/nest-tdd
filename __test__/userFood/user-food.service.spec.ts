import { Test } from '@nestjs/testing';
import { UserFood } from '@prisma/client';
import { UserFoodNotFoundException } from 'src/common/exception/user-food.exception';
import { UserNotFoundException } from 'src/common/exception/user.exception';
import { UserRepository } from 'src/user/repository/user.repository';
import { PrismaService } from '../../src/prisma/service/prisma.service';
import { UserFoodRepository } from './user-food.repository';
import { UserFoodService } from './user-food.service';

describe('User Food Service Test', () => {
  let userFoodRepository: UserFoodRepository;
  let userFoodService: UserFoodService;
  let userRepository: UserRepository;
  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        UserFoodRepository,
        UserFoodService,
        PrismaService,
        UserRepository,
      ],
    }).compile();

    userFoodRepository = testModule.get<UserFoodRepository>(UserFoodRepository);
    userFoodService = testModule.get<UserFoodService>(UserFoodService);
    userRepository = testModule.get<UserRepository>(UserRepository);

    expect(userFoodRepository).toBeDefined();
    expect(userFoodService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const userId = 1;
  const foodList: UserFood[] = [
    {
      id: 1,
      name: '테스트음식',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  describe('유저 음식 리스트', () => {
    it('유저 없는경우', async () => {
      jest
        .spyOn(userRepository, 'findUser')
        .mockImplementation(async () => undefined);

      await expect(
        async () => await userFoodService.getList(0),
      ).rejects.toThrowError(UserNotFoundException);
    });

    it('리스트', async () => {
      jest.spyOn(userRepository, 'findUser').mockImplementation(async () => 1);

      jest
        .spyOn(userFoodRepository, 'getList')
        .mockImplementation(async () => foodList);
      const list = await userFoodService.getList(userId);
      expect(list).toBeInstanceOf(Array);
    });
  });

  describe('음식 생성', () => {
    const createFood: { userId: number; name: string } = {
      name: '테스트 음식',
      userId: 0,
    };

    it('유저가 없는경우', async () => {
      jest
        .spyOn(userRepository, 'findUser')
        .mockImplementation(async () => undefined);

      expect(
        async () => await userFoodService.create(createFood),
      ).rejects.toThrowError(UserNotFoundException);
      expect(userRepository.findUser).toBeCalledTimes(1);
    });

    it('음식 생성 성공', async () => {
      jest.spyOn(userRepository, 'findUser').mockImplementation(async () => 1);

      jest
        .spyOn(userFoodRepository, 'createUserFood')
        .mockImplementation(async () => 1);

      await userFoodService.create(createFood);

      expect(userRepository.findUser).toBeCalledTimes(1);
      expect(userFoodRepository.createUserFood).toBeCalledTimes(1);
    });
  });

  describe('음식 수정', () => {
    const foodId = 1;
    const updateFood: { name: string } = { name: '수정음식이름' };
    it('음식 없는경우', async () => {
      jest
        .spyOn(userFoodRepository, 'findFoodById')
        .mockImplementation(() => undefined);

      expect(
        async () => await userFoodService.updateFood(foodId, updateFood),
      ).rejects.toThrowError(UserFoodNotFoundException);

      expect(userFoodRepository.findFoodById).toBeCalledTimes(1);
    });

    it('수정 성공', async () => {
      jest
        .spyOn(userFoodRepository, 'findFoodById')
        .mockImplementation(async () => ({
          id: 1,
          name: '테스트음식',
        }));

      jest
        .spyOn(userFoodRepository, 'updateFood')
        .mockImplementation(async () => undefined);

      await userFoodService.updateFood(foodId, updateFood);

      expect(userFoodRepository.findFoodById).toBeCalledTimes(1);
      expect(userFoodRepository.updateFood).toBeCalledTimes(1);
    });
  });

  describe('음식 삭제', () => {
    //
    const foodId = 1;
    it('삭제할 음식이 없는경우', async () => {
      jest
        .spyOn(userFoodRepository, 'findFoodById')
        .mockImplementation(async () => undefined);

      expect(
        async () => await userFoodService.deleteFood(foodId),
      ).rejects.toThrowError(UserFoodNotFoundException);
      expect(userFoodRepository.findFoodById).toBeCalledTimes(1);
    });

    it('삭제 성공', async () => {
      jest
        .spyOn(userFoodRepository, 'findFoodById')
        .mockImplementation(async () => ({ id: 1, name: '삭제할음식' }));

      jest
        .spyOn(userFoodRepository, 'delete')
        .mockImplementation(async () => undefined);

      await userFoodService.deleteFood(foodId);

      expect(userFoodRepository.findFoodById).toBeCalledTimes(1);
      expect(userFoodRepository.delete).toBeCalledTimes(1);
    });
  });
});
