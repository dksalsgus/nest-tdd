import { ApiProperty } from '@nestjs/swagger';

export class RequestRefreshNaverAccessToken {
  @ApiProperty({ description: '리프레쉬 토큰' })
  refreshToken: string;
}
