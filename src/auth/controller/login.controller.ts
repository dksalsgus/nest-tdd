import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
@Controller('/login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}
}
