import { Injectable } from '@nestjs/common';
import { HttpProvider } from 'src/common/provider/http.provider';

@Injectable()
export class AuthService {
  private readonly naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  private readonly naverCallbackUrl =
    'http://localhost:3000/login/oauth/naver/callback';
  constructor(private readonly httpProvider: HttpProvider) {}

  async naverLogin() {
    const reqUrl =
      this.naverAuthUrl +
      `?response_type=code&client_id=${
        process.env.NAVER_CLIENT_ID
      }&redirect_uri=${this.naverCallbackUrl}&state=${'RAMDOM_STATE'}`;
    console.log(reqUrl);
    const response = await this.httpProvider.get(reqUrl, {});
    return response.data;
  }
}
