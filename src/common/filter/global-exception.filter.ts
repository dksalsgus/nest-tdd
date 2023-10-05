import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GlobalException } from '../exception/global-exeption';

@Catch(GlobalException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('global exception filter ', exception);
  }
}
