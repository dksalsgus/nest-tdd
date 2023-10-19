import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider {
  private readonly refreshTokenExpiresIn = 60 * 60 * 24 * 7; // 7일
  private readonly accessTokenExpiresIn = 60; // 60초
  constructor(private readonly jwtService: JwtService) {}

  getAccessToken(jwtPayload: JwtPayload): JwtTokenResult {
    const accessToken = this.jwtService.sign(jwtPayload);
    const refreshToken = this.getRefreshToken(jwtPayload);
    return { accessToken, refreshToken, expiresIn: this.accessTokenExpiresIn };
  }

  private getRefreshToken(jwtPayload: JwtPayload): string {
    const refreshToken = this.jwtService.sign(jwtPayload, {
      expiresIn: this.refreshTokenExpiresIn,
    });
    return refreshToken;
  }

  verifyToken(token: string): void {
    const result = this.jwtService.verify(token);
  }
}

export interface JwtPayload {
  id: number;
  name: string;
}

export interface JwtTokenResult {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
