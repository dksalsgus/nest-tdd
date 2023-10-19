import { Injectable } from '@nestjs/common';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import { ResponseDeleteNaverToken } from '../model/response/response.delete-naver-token';
import { ResponseNaverTokenRefresh } from '../model/response/response.naver-login';
import { NaverOauthProvider } from '../provider/naver-oauth.provider';

@Injectable()
export class AuthService {
  constructor(private readonly naverOauthProvider: NaverOauthProvider) {}

  getNaverLoginUrl(): string {
    const url = this.naverOauthProvider.getNaverLoginUrl();
    return url;
  }

  async naverLogin(requestNaverCallBackQuery: RequestNaverCallBackQuery) {
    const result = await this.naverOauthProvider.getAccessToken(
      requestNaverCallBackQuery,
    );
    const { accessToken, tokenType } = result;
    const naverUserInfo = await this.naverOauthProvider.getNaverUserInfo({
      token: accessToken,
      tokenType,
    });
    const {} = naverUserInfo;
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
