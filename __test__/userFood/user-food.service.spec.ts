import { Test } from '@nestjs/testing';
import { PrismaService } from '../../src/prisma/service/prisma.service';

describe('User Food Service Test', () => {
  let userFoodRepository: UserFoodRepository;
  beforeEach(async () => {
    const testModele = await Test.createTestingModule({
      providers: [UserFoodRepository],
    }).compile();

    userFoodRepository = testModele.get<UserFoodRepository>(UserFoodRepository);

    expect(userFoodRepository).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('유저 음식 리스트', () => {
    it('리스트', () => {});
  });
});

export class UserFoodRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getList() {
    const list = await this.prismaService.userFood.findMany();
    return list;
  }
}
