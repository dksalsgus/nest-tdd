import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApiDocumentConfig } from 'config/api-document.config';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  const apiDocument = new ApiDocumentConfig(app);
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
