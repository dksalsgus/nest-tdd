import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from 'config/db/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
