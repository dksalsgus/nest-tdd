import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RequestCreateUser } from '../model/request/request.create-user';
import { UserService } from '../service/user.service';

@Controller('/users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getListUser() {
    const list = await this.userService.getListUser();
    return list;
  }

  @Post('/')
  async createUser(@Body() requestCreateUser: RequestCreateUser) {
    const result = await this.userService.createUser(requestCreateUser);
    return result;
  }
}
