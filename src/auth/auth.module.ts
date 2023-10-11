import { Module } from '@nestjs/common';
import { HttpProvider } from 'src/common/http.provider';
import { LoginController } from './controller/login.controller';
import { AuthService } from './service/auth.service';

@Module({
  imports: [HttpProvider],
  providers: [AuthService, HttpProvider],
  controllers: [LoginController],
})
export class AuthModule {}
