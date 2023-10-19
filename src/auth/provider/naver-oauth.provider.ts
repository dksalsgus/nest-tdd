import { Injectable } from '@nestjs/common';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestNaverUserInfo } from '../model/request/request.naver-user-info';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import { ResponseNaverLogin } from '../model/response/response.naver-login';
import { ResponseNaverUserInfo } from '../model/response/response.naver-user-info';
import { NaverOauthRepository } from '../repository/naver-oauth.repository';

@Injectable()
export class NaverOauthProvider {
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
  ): Promise<RefreshNaverTokenResult> {
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
  ): Promise<DeleteNaverTokenResult> {
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

export interface RefreshNaverTokenResult {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
}

export interface DeleteNaverTokenResult {
  accessToken: string;
  result: string;
}
