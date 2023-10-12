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
import { RequestRefreshNaverAccessToken } from '../model/request/request.refresh-naver-access-token';
import {
  ResponseNaverDeleteToken,
  ResponseNaverLogin,
  ResponseNaverTokenRefresh,
} from '../model/response/response.naver-login';
import { NaverOauthService } from '../service/naver-oauth.service';

@ApiTags('Oauth Login')
@Controller('/login/oauth')
export class LoginOauthController {
  constructor(private readonly naverOauthService: NaverOauthService) {}

  @Get('/naver')
  @ApiOperation({ summary: '네이버 Oauth' })
  @ApiResponse({ status: 200, description: 'redirect naver oauth callback' })
  async naverLogin(@Res() res: Response): Promise<void> {
    const result = await this.naverOauthService.naverLoginAuth();
    return res.redirect(result);
  }

  @Get('/naver/callback')
  @ApiOperation({ summary: '네이버 Oauth CallBack' })
  @ApiResponse({
    description: '토큰',
    type: ResponseNaverLogin,
  })
  async naverLoginCallback(
    @Query() requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<ResponseNaverLogin> {
    const result = await this.naverOauthService.getAccesToken(
      requestNaverCallBackQuery,
    );
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      refresh_token: refreshToken,
      token_type: tokenType,
    } = result;
    return { accessToken, refreshToken, tokenType, expiresIn };
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
    const {
      access_token: accessToken,
      expires_in: expiresIn,
      token_type: tokenType,
    } = result;
    return { accessToken, tokenType, expiresIn };
  }

  @Delete('/naver/token')
  @ApiOperation({ summary: '네이버 Token 삭제' })
  @ApiResponse({
    description: '엑세스 토큰 삭제 응답',
    type: ResponseNaverDeleteToken,
  })
  async deleteNaverToken(
    @Body() requestRefreshAccessToken: RequestDeleteNaverToken,
  ): Promise<ResponseNaverDeleteToken> {
    const result = await this.naverOauthService.deleteToken(
      requestRefreshAccessToken,
    );
    const { access_token: accessToken, result: deleteResult } = result;
    return { accessToken, result: deleteResult };
  }
}
