import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { ResponseNaverLogin } from '../model/response/response.naver-login';
import { AuthService } from '../service/auth.service';
@Controller('/login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Get('/oauth/naver')
  @ApiOperation({ summary: '네이버 Oauth' })
  async naverLogin(@Res() res: Response): Promise<void> {
    const result = await this.authService.naverLoginAuth();
    return res.redirect(result);
  }

  @Get('/oauth/naver/callback')
  @ApiOperation({ summary: '네이버 Oauth CallBack' })
  async naverLoginCallback(
    @Query() requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ): Promise<ResponseNaverLogin> {
    const result = await this.authService.getNaverToken(
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
