import { ApiProperty } from '@nestjs/swagger';

export class ResponseDeleteNaverToken {
  @ApiProperty({ description: '삭제된 Access Token' })
  accessToken: string;
  @ApiProperty({ description: 'success = 성공', example: 'success' })
  result: string;
}
