import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { JwtProvider } from 'src/auth/provider/jwt.provider';
import {
  NaverAccessTokenResult,
  NaverOauthProvider,
  NaverUserInfoResult,
} from 'src/auth/provider/naver-oauth.provider';
import { NaverOauthRepository } from 'src/auth/repository/naver-oauth.repository';
import { AuthService } from 'src/auth/service/auth.service';
import { NaverOauthUrlException } from 'src/common/exception/naver-oauth.exception';
import { HttpProvider } from 'src/common/provider/http.provider';
import { PrismaService } from 'src/prisma/service/prisma.service';
import { UserLogRepository } from 'src/user/repository/user-log.repository';
import { UserOauthRepository } from 'src/user/repository/user-oauth.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserService } from 'src/user/service/user.service';

describe('Auth Service Test', () => {
  const naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  const naverCallbackUrl = '/login/oauth/naver/callback';
  const naverTokenUrl = 'https://nid.naver.com/oauth2.0/token';
  const naverUserApiUrl = 'https://openapi.naver.com/v1/nid/me';

  let authService: AuthService;
  let naverOauthProvider: NaverOauthProvider;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        NaverOauthProvider,
        NaverOauthRepository,
        AuthService,
        UserService,
        UserRepository,
        UserLogRepository,
        UserOauthRepository,
        JwtProvider,
        JwtService,
        PrismaService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              post: jest.fn(async () => {
                return { data: '' };
              }),
              get: jest.fn(async () => {
                return { data: '' };
              }),
            },
          },
        },
        {
          provide: HttpProvider,
          inject: [HttpService],
          useFactory: (httpService: HttpService) => {
            return new HttpProvider(httpService);
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              return 'mock server url';
            }),
          },
        },
      ],
    }).compile();

    authService = testModule.get<AuthService>(AuthService);
    naverOauthProvider = testModule.get<NaverOauthProvider>(NaverOauthProvider);
    userService = testModule.get<UserService>(UserService);
    jwtService = testModule.get<JwtService>(JwtService);
    expect(authService).toBeDefined();
    expect(naverOauthProvider).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('네이버 Oauth', () => {
    describe('로그인 URL', () => {
      it('로그인 URL 실패', () => {
        jest
          .spyOn(naverOauthProvider, 'getNaverLoginUrl')
          .mockImplementation(() => '');

        expect(() => authService.getNaverLoginUrl()).toThrowError(
          NaverOauthUrlException,
        );
      });

      it('로그인 URL 성공', () => {
        jest
          .spyOn(naverOauthProvider, 'getNaverLoginUrl')
          .mockImplementation(() => naverAuthUrl);

        const loginUrl = authService.getNaverLoginUrl();
        expect(naverOauthProvider.getNaverLoginUrl).toBeCalledTimes(1);
        expect(loginUrl).toBe(naverAuthUrl);
      });
    });
  });

  describe('네이버 로그인', () => {
    const naverUserInfo: NaverUserInfoResult = {
      birthYear: '1992',
      email: 'test@naver.com',
      id: 'asdfasfdsaf',
      mobile: '01012341234',
      mobileE164: '+821012341234',
      name: '테스터',
    };

    const accessTokenResult: NaverAccessTokenResult = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      tokenType: 'bearer',
      expiresIn: '3600',
    };
  });
});
