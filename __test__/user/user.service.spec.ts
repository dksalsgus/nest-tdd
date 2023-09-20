import { Test } from '@nestjs/testing';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/service/user.service';

describe('User Service Test', () => {
  let userService: UserService;
  let userRepository: UserRepository;
  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userRepository = testModule.get<UserRepository>(UserRepository);
    userService = testModule.get<UserService>(UserService);

    expect(userRepository).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('test', () => {
    expect(userRepository).toBeDefined();
  });
});
