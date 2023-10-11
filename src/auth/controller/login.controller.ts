import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/login')
@ApiTags('Login')
export class LoginController {
  constructor() {}

  @Post('/oauth/naver')
  @ApiOperation({ summary: '네이버 Oauth' })
  async naver() {
    return 'test';
  }
}
