import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import { ResponseDeleteNaverToken } from '../model/response/response.delete-naver-token';
import { ResponseLogin } from '../model/response/response.login';
import { ResponseNaverTokenRefresh } from '../model/response/response.naver-login';
import { NaverOauthProvider } from '../provider/naver-oauth.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly naverOauthProvider: NaverOauthProvider,
    private readonly userRepository: UserRepository,
  ) {}

  getNaverLoginUrl(): string {
    const url = this.naverOauthProvider.getNaverLoginUrl();
    return url;
  }

  async naverLogin(
    requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<ResponseLogin> {
    const result = await this.naverOauthProvider.getAccessToken(
      requestNaverCallBackQuery,
    );
    const { accessToken, tokenType } = result;
    const naverUserInfo = await this.naverOauthProvider.getNaverUserInfo({
      token: accessToken,
      tokenType,
    });
    const { mobile, name } = naverUserInfo;
    const user = await this.userRepository.findUserByNameAndPhone(name, mobile);
    if (user) {
      //TODO: 로그인 및 토큰 발급
      return;
    }
    //TODO: 회원가입 및 토큰 발급
    return;
  }

  async refreshNaverToken(
    requestRefreshNaverAccessToken: RequestRefreshNaverAccessToken,
  ): Promise<ResponseNaverTokenRefresh> {
    const result = await this.naverOauthProvider.refreshAccessToken(
      requestRefreshNaverAccessToken,
    );
    const { accessToken, expiresIn, tokenType } = result;
    return { accessToken, tokenType, expiresIn };
  }

  async deleteNaverToken(
    requestDeleteNaverToken: RequestDeleteNaverToken,
  ): Promise<ResponseDeleteNaverToken> {
    const result = await this.naverOauthProvider.deleteToken(
      requestDeleteNaverToken,
    );
    const { accessToken, result: deleteResult } = result;
    return { accessToken, result: deleteResult };
  }
}
