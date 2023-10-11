import { Injectable } from '@nestjs/common';
import { HttpProvider } from 'src/common/provider/http.provider';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';

@Injectable()
export class AuthService {
  private readonly naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  private readonly naverCallbackUrl =
    'http://localhost:3000/login/oauth/naver/callback';
  private readonly naverTokenUrl = 'https://nid.naver.com/oauth2.0/token';
  constructor(private readonly httpProvider: HttpProvider) {}

  async naverLoginAuth() {
    const requestUrl =
      this.naverAuthUrl +
      `?response_type=code&client_id=${
        process.env.NAVER_CLIENT_ID
      }&redirect_uri=${this.naverCallbackUrl}&state=${'RAMDOM_STATE'}`;
    console.log(requestUrl);
    const response = await this.httpProvider.get(requestUrl, {});
    return response.data;
  }

  async naverToken(requestNaverCallBackQuery: RequestNaverCallBackQuery) {
    const { code, state } = requestNaverCallBackQuery;
    const requestUrl =
      this.naverTokenUrl +
      `?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_SECRET}&code=${code}&state=${state}`;
    const response = await this.httpProvider.post(requestUrl, {}, {});
    return response.data;
  }
}
