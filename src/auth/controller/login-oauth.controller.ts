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
import { ResponseDeleteNaverToken } from '../model/response/response.delete-naver-token';
import { ResponseLogin } from '../model/response/response.login';
import { NaverOauthProvider } from '../provider/naver-oauth.provider';
import { AuthService } from '../service/auth.service';

@ApiTags('Oauth Login')
@Controller('/login/oauth')
export class LoginOauthController {
  constructor(
    private readonly naverOauthService: NaverOauthProvider,
    private readonly authService: AuthService,
  ) {}

  @Get('/naver')
  @ApiOperation({ summary: '네이버 Oauth URL' })
  @ApiResponse({ status: 200, description: 'redirect naver oauth callback' })
  naverLogin(@Res() res: Response): void {
    const result = this.authService.getNaverLoginUrl();
    return res.redirect(result);
  }

  @Get('/naver/callback')
  @ApiOperation({ summary: '네이버 Oauth CallBack' })
  @ApiResponse({
    description: '네이버 로그인 응답',
    type: ResponseLogin,
  })
  async getAccessToken(
    @Query() requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<ResponseLogin> {
    const result = await this.authService.naverLogin(requestNaverCallBackQuery);
    return result;
  }

  @Post('/naver/refresh')
  @ApiOperation({ summary: '네이버 Refresh Token' })
  @ApiResponse({
    description: '엑세스 토큰 갱신 응답',
  })
  async refreshAccessToken(
    @Body() requestRefreshAccessToken: RequestRefreshNaverAccessToken,
  ) {
    const result = await this.authService.refreshNaverToken(
      requestRefreshAccessToken,
    );
    return result;
  }

  @Delete('/naver/token')
  @ApiOperation({ summary: '네이버 Token 삭제' })
  @ApiResponse({
    description: '엑세스 토큰 삭제 응답',
    type: ResponseDeleteNaverToken,
  })
  async deleteNaverToken(
    @Body() requestRefreshAccessToken: RequestDeleteNaverToken,
  ): Promise<ResponseDeleteNaverToken> {
    const result = await this.naverOauthService.deleteToken(
      requestRefreshAccessToken,
    );
    return result;
  }

  // @Post('/naver/user')
  // @ApiOperation({ summary: '네이버 유저 정보' })
  // @ApiResponse({
  //   description: '네이버 유저 정보',
  //   type: ResponseNaverUserInfo,
  // })
  // async getUserInfo(
  //   @Body() requestNaverUserInfo: RequestNaverUserInfo,
  // ): Promise<ResponseNaverUserInfo> {
  //   const result = await this.naverOauthService.getNaverUserInfo(
  //     requestNaverUserInfo,
  //   );
  //   return result;
  // }
}
