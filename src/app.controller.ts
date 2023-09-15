import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<User[]> {
    const userList = await this.appService.getListUser();
    return userList;
  }

  @Get('/test')
  async getListTest() {
    const testList = await this.appService.getListTest();
    return testList;
  }
}
