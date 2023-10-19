import { ApiProperty } from '@nestjs/swagger';

export class RequestCreateUser {
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  email: string;
  @ApiProperty({ description: '이름', example: '홍길동' })
  name: string;
  @ApiProperty({ description: '패스워드', example: 'honggildong1234' })
  password: string;
  @ApiProperty({ description: '휴대전화 번호', example: '010-1234-1234' })
  phone: string;
  @ApiProperty({
    description: 'Oauth service provder name',
    example: 'NAVER',
  })
  serviceName: string;
}
