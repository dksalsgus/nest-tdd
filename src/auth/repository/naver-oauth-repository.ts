import { Injectable } from '@nestjs/common';
import { HttpProvider } from 'src/common/provider/http.provider';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestNaverUserInfo } from '../model/request/request.naver-user-info';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';

@Injectable()
export class NaverOauthRepository {
  private readonly naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  private readonly naverCallbackUrl =
    'http://localhost:3000/login/oauth/naver/callback';
  private readonly naverTokenUrl = 'https://nid.naver.com/oauth2.0/token';
  private readonly naverUserApiUrl = 'https://openapi.naver.com/v1/nid/me';

  private get naverClientId(): string {
    const clientId = process.env.NAVER_CLIENT_ID;
    if (!clientId) {
      throw new Error('Naver Client Id Not Found');
    }
    return clientId;
  }

  private get naverSecret(): string {
    const secret = process.env.NAVER_SECRET;
    if (!secret) {
      throw new Error('Naver Secret Not Found');
    }
    return secret;
  }

  constructor(private readonly httpProvider: HttpProvider) {}

  getNaverLoginUrl(): string {
    const requestUrl =
      this.naverAuthUrl +
      `?response_type=code&client_id=${
        process.env.NAVER_CLIENT_ID
      }&redirect_uri=${this.naverCallbackUrl}&state=${'RAMDOM_STATE'}`;
    console.log(requestUrl);
    return requestUrl;
  }

  async getAccesToken(
    requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<NaverOauthTokenResult> {
    const { code, state } = requestNaverCallBackQuery;
    const grantType = EnNaverGrantType.authorizationCode;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=${grantType}&client_id=${this.naverClientId}&client_secret=${this.naverSecret}&code=${code}&state=${state}`;
    const data = await this.httpProvider.post<NaverOauthTokenResult>(
      requestUrl,
      {},
      {},
    );
    return data;
  }

  async refreshAccessToken(
    requestRefreshNaverAccessToken: RequestRefreshNaverAccessToken,
  ): Promise<NaverOauthTokenRefreshResult> {
    const grantType = EnNaverGrantType.refreshToken;
    const { refreshToken } = requestRefreshNaverAccessToken;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=${grantType}&client_id=${this.naverClientId}&client_secret=${this.naverSecret}&refresh_token=${refreshToken}`;
    const data = await this.httpProvider.post<NaverOauthTokenRefreshResult>(
      requestUrl,
      {},
      {},
    );
    return data;
  }

  async deleteToken(
    requestDeleteNaverToken: RequestDeleteNaverToken,
  ): Promise<NaverOauthTokenDeleteResult> {
    const grantType = EnNaverGrantType.delete;
    const serviceProvider = 'NAVER';
    const { accessToken } = requestDeleteNaverToken;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=${grantType}&client_id=${this.naverClientId}&client_secret=${this.naverSecret}&access_token=${accessToken}&service_provider=${serviceProvider}`;
    const data = await this.httpProvider.post<NaverOauthTokenDeleteResult>(
      requestUrl,
      {},
      {},
    );
    return data;
  }

  async getNaverUserInfo(
    requestNaverUserInfo: RequestNaverUserInfo,
  ): Promise<NaverUserInfoResponse> {
    const { token, tokenType } = requestNaverUserInfo;
    const response = await this.httpProvider.get<NaverUserInfo>(
      this.naverUserApiUrl,
      {
        headers: { Authorization: `${tokenType} ${token}` },
      },
    );
    const { response: info } = response.data;
    return info;
  }
}

interface NaverOauthTokenResult {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: string;
}

interface NaverOauthTokenRefreshResult
  extends Pick<
    NaverOauthTokenResult,
    'access_token' | 'expires_in' | 'token_type'
  > {}

interface NaverOauthTokenDeleteResult
  extends Pick<NaverOauthTokenResult, 'access_token'> {
  result: string;
}

export enum EnNaverGrantType {
  authorizationCode = 'authorization_code',
  refreshToken = 'refresh_token',
  delete = 'delete',
}

interface NaverUserInfo {
  resultCode: string;
  message: string;
  response: NaverUserInfoResponse;
}

interface NaverUserInfoResponse {
  birthyear: string;
  email: string;
  id: string;
  mobile: string;
  mobile_e164: string;
  name: string;
}
