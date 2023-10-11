import { Injectable } from '@nestjs/common';
import { HttpProvider } from 'src/common/http.provider';

@Injectable()
export class AuthService {
  private readonly naverAuthUrl = 'https://nid.naver.com/oauth2.0/authorize';
  constructor(private readonly httpProvider: HttpProvider) {}

  async test() {
    const response = await this.httpProvider.get(this.naverAuthUrl, {});
    return response;
  }
}
