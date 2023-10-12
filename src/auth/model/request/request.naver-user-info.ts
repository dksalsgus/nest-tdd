import { ApiProperty } from '@nestjs/swagger';

export class RequestNaverUserInfo {
  @ApiProperty({ description: 'access token' })
  token: string;
  @ApiProperty({ description: 'token type', example: 'bearer' })
  tokenType: string;
}
