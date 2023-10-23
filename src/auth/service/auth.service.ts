import { Injectable } from '@nestjs/common';
import { NaverOauthUrlException } from 'src/common/exception/naver-oauth.exception';
import { UserService } from 'src/user/service/user.service';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import { ResponseDeleteNaverToken } from '../model/response/response.delete-naver-token';
import { ResponseLogin } from '../model/response/response.login';
import { JwtProvider } from '../provider/jwt.provider';
import {
  NaverOauthProvider,
  NaverRfreshTokenResult,
} from '../provider/naver-oauth.provider';

@Injectable()
export class AuthService {
  private readonly oauthUserPassword: string = 'oauthPassword';

  constructor(
    private readonly naverOauthProvider: NaverOauthProvider,
    private readonly jwtProvider: JwtProvider,
    private readonly userService: UserService,
  ) {}

  getNaverLoginUrl(): string {
    const url = this.naverOauthProvider.getNaverLoginUrl();
    if (!url) {
      throw new NaverOauthUrlException();
    }
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
    const { mobile, name, email } = naverUserInfo;
    const user = await this.userService.findUserByNameAndPhone(name, mobile);
    if (user) {
      const { id, name } = user;
      const tokenResult = this.jwtProvider.getAccessToken({ id, name });
      const { accessToken, expiresIn, refreshToken } = tokenResult;
      return { accessToken, refreshToken, expireIn: expiresIn };
    }
    const userId = await this.userService.createUser({
      email,
      name,
      password: this.oauthUserPassword,
      phone: mobile,
      serviceName: 'NAVER',
    });
    const tokenResult = this.jwtProvider.getAccessToken({
      id: userId,
      name,
    });
    const { accessToken: jwtToken, expiresIn, refreshToken } = tokenResult;
    return { accessToken: jwtToken, refreshToken, expireIn: expiresIn };
  }

  async refreshNaverToken(
    requestRefreshNaverAccessToken: RequestRefreshNaverAccessToken,
  ): Promise<NaverRfreshTokenResult> {
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
