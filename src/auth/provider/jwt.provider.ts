import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider {
  constructor(private readonly jwtService: JwtService) {}

  signJwt(jwtPayload: JwtPayload): string {
    const token = this.jwtService.sign(jwtPayload);
    return token;
  }

  verifyJwt(token: string): void {
    const result = this.jwtService.verify(token);
  }
}

export interface JwtPayload {
  id: number;
  name: string;
}
