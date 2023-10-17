import { Injectable } from '@nestjs/common';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestNaverUserInfo } from '../model/request/request.naver-user-info';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import {
  NaverOauthRepository,
  NaverOauthTokenDeleteResult,
  NaverOauthTokenRefreshResult,
  NaverOauthTokenResult,
  NaverUserResponse,
} from '../repository/naver-oauth-repository';

@Injectable()
export class NaverOauthService {
  private readonly naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  private readonly naverCallbackUrl =
    'http://localhost:3000/login/oauth/naver/callback';
  private readonly naverTokenUrl = 'https://nid.naver.com/oauth2.0/token';
  private readonly naverUserApiUrl = 'https://openapi.naver.com/v1/nid/me';

  constructor(private readonly naverOauthRepository: NaverOauthRepository) {}

  async naverLoginAuth(): Promise<string> {
    const response = await this.naverOauthRepository.naverLoginAuth();
    return response;
  }

  async getAccesToken(
    requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<NaverOauthTokenResult> {
    const data = await this.naverOauthRepository.getAccesToken(
      requestNaverCallBackQuery,
    );
    return data;
  }

  async refreshAccessToken(
    requestRefreshNaverAccessToken: RequestRefreshNaverAccessToken,
  ): Promise<NaverOauthTokenRefreshResult> {
    const data = await this.naverOauthRepository.refreshAccessToken(
      requestRefreshNaverAccessToken,
    );
    return data;
  }

  async deleteToken(
    requestDeleteNaverToken: RequestDeleteNaverToken,
  ): Promise<NaverOauthTokenDeleteResult> {
    const data = await this.naverOauthRepository.deleteToken(
      requestDeleteNaverToken,
    );
    return data;
  }

  async getNaverUserInfo(
    requestNaverUserInfo: RequestNaverUserInfo,
  ): Promise<NaverUserResponse> {
    const info = await this.naverOauthRepository.getNaverUserInfo(
      requestNaverUserInfo,
    );
    return info;
  }
}
