import { Injectable } from '@nestjs/common';
import { HttpProvider } from 'src/common/provider/http.provider';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';

@Injectable()
export class NaverOauthService {
  private readonly naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  private readonly naverCallbackUrl =
    'http://localhost:3000/login/oauth/naver/callback';
  private readonly naverTokenUrl = 'https://nid.naver.com/oauth2.0/token';
  constructor(private readonly httpProvider: HttpProvider) {}

  async naverLoginAuth(): Promise<string> {
    const requestUrl =
      this.naverAuthUrl +
      `?response_type=code&client_id=${
        process.env.NAVER_CLIENT_ID
      }&redirect_uri=${this.naverCallbackUrl}&state=${'RAMDOM_STATE'}`;
    console.log(requestUrl);
    const response = await this.httpProvider.get(requestUrl, {});
    return requestUrl;
  }

  async getAccesToken(
    requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<NaverOauthToken> {
    const { code, state } = requestNaverCallBackQuery;
    const grantType = EnNaverGrantType.authorizationCode;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=${grantType}&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_SECRET}&code=${code}&state=${state}`;
    const data = await this.httpProvider.post<NaverOauthToken>(
      requestUrl,
      {},
      {},
    );
    return data;
  }

  async refreshAccessToken(
    requestRefreshNaverAccessToken: RequestRefreshNaverAccessToken,
  ): Promise<NaverOauthToken> {
    const grantType = EnNaverGrantType.refreshToken;
    const { refreshToken } = requestRefreshNaverAccessToken;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=${grantType}&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_SECRET}&refresh_token=${refreshToken}`;
    const data = await this.httpProvider.post<NaverOauthToken>(
      requestUrl,
      {},
      {},
    );
    return data;
  }

  async deleteToken(
    requestDeleteNaverToken: RequestDeleteNaverToken,
  ): Promise<NaverOauthToken> {
    const grantType = EnNaverGrantType.delete;
    const serviceProvider = 'NAVER';
    const { accessToken } = requestDeleteNaverToken;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=${grantType}&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_SECRET}&access_token=${accessToken}&service_provider=${serviceProvider}`;
    const data = await this.httpProvider.post<NaverOauthToken>(
      requestUrl,
      {},
      {},
    );
    return data;
  }
}

export interface NaverOauthToken {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

export enum EnNaverGrantType {
  authorizationCode = 'authorization_code',
  refreshToken = 'refresh_token',
  delete = 'delete',
}
