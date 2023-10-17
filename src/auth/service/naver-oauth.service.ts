import { Injectable } from '@nestjs/common';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestNaverUserInfo } from '../model/request/request.naver-user-info';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import { ResponseDeleteNaverToken } from '../model/response/response.delete-naver-token';
import {
  ResponseNaverLogin,
  ResponseNaverTokenRefresh,
} from '../model/response/response.naver-login';
import { ResponseNaverUserInfo } from '../model/response/response.naver-user-info';
import { NaverOauthRepository } from '../repository/naver-oauth-repository';

@Injectable()
export class NaverOauthService {
  private readonly naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  private readonly naverCallbackUrl =
    'http://localhost:3000/login/oauth/naver/callback';
  private readonly naverTokenUrl = 'https://nid.naver.com/oauth2.0/token';
  private readonly naverUserApiUrl = 'https://openapi.naver.com/v1/nid/me';

  constructor(private readonly naverOauthRepository: NaverOauthRepository) {}

  getNaverLoginUrl(): string {
    const response = this.naverOauthRepository.getNaverLoginUrl();
    return response;
  }

  async getAccessToken(
    requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<ResponseNaverLogin> {
    const data = await this.naverOauthRepository.getAccesToken(
      requestNaverCallBackQuery,
    );
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      token_type: tokenType,
    } = data;
    return { accessToken, refreshToken, tokenType, expiresIn };
  }

  async refreshAccessToken(
    requestRefreshNaverAccessToken: RequestRefreshNaverAccessToken,
  ): Promise<ResponseNaverTokenRefresh> {
    const data = await this.naverOauthRepository.refreshAccessToken(
      requestRefreshNaverAccessToken,
    );
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      token_type: tokenType,
    } = data;
    return { accessToken, tokenType, expiresIn };
  }

  async deleteToken(
    requestDeleteNaverToken: RequestDeleteNaverToken,
  ): Promise<ResponseDeleteNaverToken> {
    const data = await this.naverOauthRepository.deleteToken(
      requestDeleteNaverToken,
    );
    const { access_token: accessToken, result } = data;
    return { accessToken, result };
  }

  async getNaverUserInfo(
    requestNaverUserInfo: RequestNaverUserInfo,
  ): Promise<ResponseNaverUserInfo> {
    const info = await this.naverOauthRepository.getNaverUserInfo(
      requestNaverUserInfo,
    );
    const {
      birthyear: birthYear,
      email,
      id,
      mobile,
      mobile_e164: mobileE164,
      name,
    } = info;
    return { id, email, name, mobile, mobileE164, birthYear };
  }
}
