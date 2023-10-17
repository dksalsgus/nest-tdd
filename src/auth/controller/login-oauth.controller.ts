import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequestDeleteNaverToken } from '../model/request/request.delete-naver-token';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { RequestNaverUserInfo } from '../model/request/request.naver-user-info';
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import { ResponseDeleteNaverToken } from '../model/response/response.delete-naver-token';
import {
  ResponseNaverDeleteToken,
  ResponseNaverLogin,
  ResponseNaverTokenRefresh,
} from '../model/response/response.naver-login';
import { ResponseNaverUserInfo } from '../model/response/response.naver-user-info';
import { NaverOauthService } from '../service/naver-oauth.service';

@ApiTags('Oauth Login')
@Controller('/login/oauth')
export class LoginOauthController {
  constructor(private readonly naverOauthService: NaverOauthService) {}

  @Get('/naver')
  @ApiOperation({ summary: '네이버 Oauth URL' })
  @ApiResponse({ status: 200, description: 'redirect naver oauth callback' })
  naverLogin(@Res() res: Response): void {
    const result = this.naverOauthService.getNaverLoginUrl();
    return res.redirect(result);
  }

  @Get('/naver/callback')
  @ApiOperation({ summary: '네이버 Oauth CallBack' })
  @ApiResponse({
    description: '토큰',
    type: ResponseNaverLogin,
  })
  async getAccessToken(
    @Query() requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<ResponseNaverLogin> {
    const result = await this.naverOauthService.getAccessToken(
      requestNaverCallBackQuery,
    );
    return result;
  }

  @Post('/naver/refresh')
  @ApiOperation({ summary: '네이버 Refresh Token' })
  @ApiResponse({
    description: '엑세스 토큰 갱신 응답',
    type: ResponseNaverTokenRefresh,
  })
  async refreshAccessToken(
    @Body() requestRefreshAccessToken: RequestRefreshNaverAccessToken,
  ): Promise<ResponseNaverTokenRefresh> {
    const result = await this.naverOauthService.refreshAccessToken(
      requestRefreshAccessToken,
    );
    return result;
  }

  @Delete('/naver/token')
  @ApiOperation({ summary: '네이버 Token 삭제' })
  @ApiResponse({
    description: '엑세스 토큰 삭제 응답',
    type: ResponseNaverDeleteToken,
  })
  async deleteNaverToken(
    @Body() requestRefreshAccessToken: RequestDeleteNaverToken,
  ): Promise<ResponseDeleteNaverToken> {
    const result = await this.naverOauthService.deleteToken(
      requestRefreshAccessToken,
    );
    return result;
  }

  @Post('/naver/user')
  @ApiOperation({ summary: '네이버 유저 정보' })
  @ApiResponse({
    description: '네이버 유저 정보',
    type: ResponseNaverUserInfo,
  })
  async getUserInfo(
    @Body() requestNaverUserInfo: RequestNaverUserInfo,
  ): Promise<ResponseNaverUserInfo> {
    const result = await this.naverOauthService.getNaverUserInfo(
      requestNaverUserInfo,
    );
    const {
      birthyear: birthYear,
      email,
      id,
      mobile,
      mobile_e164: mobileE164,
      name,
    } = result;
    return { id, email, mobile, mobileE164, name, birthYear };
  }
}
