import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';

@Controller('/login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @Post('/oauth/naver')
  @ApiOperation({ summary: '네이버 Oauth' })
  async naver() {
    const response = await this.authService.test();
    return response;
  }
}
