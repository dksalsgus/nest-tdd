import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpProvider } from './common/http.provider';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/service/prisma.service';
import { UserModule } from './user/user.module';

const httpProvider: Provider = {
  provide: HttpProvider,
  inject: [HttpService],
  useFactory: (httpService: HttpService) => {
    return new HttpProvider(httpService);
  },
};
@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule,
    UserModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, httpProvider],
  exports: [],
})
export class AppModule {}
