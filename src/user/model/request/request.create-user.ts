import { ApiProperty } from '@nestjs/swagger';

export class RequestCreateUser {
  @ApiProperty({ description: '이메일', example: 'test@test.com' })
  email: string;
  @ApiProperty({ description: '이름', example: '홍길동' })
  name: string;
  @ApiProperty({ description: '패스워드', example: 'honggildong1234' })
  password: string;
}
