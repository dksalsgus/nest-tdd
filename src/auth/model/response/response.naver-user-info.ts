import { ApiProperty } from '@nestjs/swagger';

export class ResponseNaverUserInfo {
  @ApiProperty({ description: 'naver user id', example: '123124kjsadfjasdfsa' })
  id: string;
  @ApiProperty({ description: '이름', example: '홍길동' })
  name: string;
  @ApiProperty({ description: '생년', example: '1992' })
  birthYear: string;
  @ApiProperty({ description: '이메일', example: 'test.naver.com' })
  email: string;
  @ApiProperty({ description: '휴대전화 번호', example: '010-1234-1234' })
  mobile: string;
  @ApiProperty({
    description: '휴대전화번호 국가번호',
    example: '+821012341234',
  })
  mobileE164: string;
}
