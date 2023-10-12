import { Injectable } from '@nestjs/common';
import { HttpProvider } from 'src/common/provider/http.provider';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';

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

  async getNaverToken(
    requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<NaverOauthToken> {
    const { code, state } = requestNaverCallBackQuery;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_SECRET}&code=${code}&state=${state}`;
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
