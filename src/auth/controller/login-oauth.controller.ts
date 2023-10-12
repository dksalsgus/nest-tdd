import { Controller, Get, Query, Res } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { ResponseNaverLogin } from '../model/response/response.naver-login';
import { NaverOauthService } from '../service/naver-oauth.service';

@ApiTags('Oauth Login')
@Controller('/login/oauth')
export class LoginOauthController {
  constructor(private readonly naverOauthService: NaverOauthService) {}

  @Get('/naver')
  @ApiOperation({ summary: '네이버 Oauth' })
  @ApiResponse({ description: 'redirect naver oauth callback' })
  async naverLogin(@Res() res: Response): Promise<void> {
    const result = await this.naverOauthService.naverLoginAuth();
    return res.redirect(result);
  }

  @Get('/naver/callback')
  @ApiOperation({ summary: '네이버 Oauth CallBack' })
  @ApiCreatedResponse({ description: '토큰', type: ResponseNaverLogin })
  async naverLoginCallback(
    @Query() requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<ResponseNaverLogin> {
    const result = await this.naverOauthService.getNaverToken(
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
}
