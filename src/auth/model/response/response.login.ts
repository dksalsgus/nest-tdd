import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogin {
  @ApiProperty({ description: '액세스토큰' })
  accessToken: string;
  @ApiProperty({ description: '리프레쉬 토큰' })
  refreshToken: string;
  @ApiProperty({ description: '엑세스 토큰 만료시간' })
  expireIn: number;
}
