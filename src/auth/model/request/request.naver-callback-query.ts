import { ApiProperty } from '@nestjs/swagger';

export class RequestNaverCallBackQuery {
  @ApiProperty({
    description: `네이버 로그인 인증에 성공하면 반환받는 인증 코드, 접근 토큰(access token) 발급에 사용`,
  })
  code: string;
  @ApiProperty({
    description:
      '사이트 간 요청 위조 공격을 방지하기 위해 애플리케이션에서 생성한 상태 토큰으로 URL 인코딩을 적용한 값',
  })
  state: string;
  @ApiProperty({
    description: `네이버 로그인 인증에 실패하면 반환받는 에러 코드
  `,
  })
  error: string;
  @ApiProperty({
    description: `네이버 로그인 인증에 실패하면 반환받는 에러 메시지
  `,
  })
  error_description: string;
}
