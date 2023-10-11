import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { HttpProvider } from './provider/http.provider';

@Global()
@Module({
  imports: [HttpModule],
  providers: [HttpProvider],
  exports: [HttpProvider],
})
export class CommonModule {}
