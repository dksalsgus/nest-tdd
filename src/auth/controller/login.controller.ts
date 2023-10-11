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
    const result = await this.authService.naverToken(requestNaverCallBackQuery);
    // {
    //   "access_token": "AAAAOUPy906sclGIoTYyhUcWwp4v83eKPnMl73Zg-gvcVR8Mjvs__0hPoLIEf6UiAb2MUtJ6qbiH_NKw0oi45S1m9uI",
    //   "refresh_token": "ipqThXJmojJz4R0DoogtfJnFzsmadVcwNTcErIN7j4cIOjW8iieun8SvgkYipcQyKdHg1Urm1d3WP5RHP66pdUNRenLUnDvSuS7rXlxrxzVqmWYeJip7yxXXXmiif5bYHqisZr",
    //   "token_type": "bearer",
    //   "expires_in": "3600"
    //   }
    return result;
  }
}
