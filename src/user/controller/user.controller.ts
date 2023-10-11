import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RequestCreateUser } from '../model/request/request.create-user';
import { UserService } from '../service/user.service';

@Controller('/users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOperation({ summary: '유저 리스트' })
  async getListUser() {
    const list = await this.userService.getListUser();
    return list;
  }

  @Post('/')
  @ApiOperation({ summary: '유저 생성' })
  async createUser(@Body() requestCreateUser: RequestCreateUser) {
    const result = await this.userService.createUser(requestCreateUser);
    return result;
  }
}
