import { ApiProperty } from '@nestjs/swagger';

export class ResponseNaverLogin {
  @ApiProperty({
    description: `접근 토큰, 발급 후 expires_in 파라미터에 설정된 시간(초)이 지나면 만료됨`,
    example: 'access_tokenadsfsafsda',
  })
  accessToken: string;
  @ApiProperty({
    description: `갱신 토큰, 접근 토큰이 만료될 경우 접근 토큰을 다시 발급받을 때 사용`,
    example: 'refreshtoken',
  })
  refreshToken: string;
  @ApiProperty({
    description: '접근 토큰의 타입으로 Bearer와 MAC의 두 가지를 지원',
    example: 'bearer',
  })
  tokenType: string;
  @ApiProperty({
    description: `접근 토큰의 유효 기간(초 단위)`,
    example: '3600',
  })
  expiresIn: string;
}
