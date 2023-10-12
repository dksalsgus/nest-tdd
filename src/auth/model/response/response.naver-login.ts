import { ApiProperty } from '@nestjs/swagger';

export class ResponseNaverLogin {
  @ApiProperty({
    description: '엑세스 토',
    example: 'access_tokenadsfsafsda',
  })
  accessToken: string;
  @ApiProperty({
    description: '리프레쉬 토큰',
    example: 'refreshtoken',
  })
  refreshToken: string;
  @ApiProperty({
    description: '토큰 타입',
    example: 'bearer',
  })
  tokenType: string;
  @ApiProperty({
    description: '토큰 만료시간',
    example: '3600',
  })
  expiresIn: string;
}
