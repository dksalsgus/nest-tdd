import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@Controller('/login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('/oauth/naver')
  @ApiOperation({ summary: '네이버 Oauth' })
  async naverLogin() {
    const result = await this.authService.naverLogin();
    return result;
  }

  @Get('/oauth/naver/callback')
  @ApiOperation({ summary: '네이버 Oauth CallBack' })
  async naverLoginCallback(@Query('code') code: string) {
    console.log(code);
  }
}
