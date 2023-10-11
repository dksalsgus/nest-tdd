import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestNaverCallBackQuery } from '../model/request/request.naver-callback-query';
import { AuthService } from '../service/auth.service';
@Controller('/login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('/oauth/naver')
  @ApiOperation({ summary: '네이버 Oauth' })
  async naverLogin() {
    const result = await this.authService.naverLoginAuth();
    return result;
  }

  @Get('/oauth/naver/callback')
  @ApiOperation({ summary: '네이버 Oauth CallBack' })
  async naverLoginCallback(
    @Query() requestNaverCallBackQuery: RequestNaverCallBackQuery,
  ) {
    const result = await this.authService.getNaverToken(
      requestNaverCallBackQuery,
    );
    return result;
  }
}
