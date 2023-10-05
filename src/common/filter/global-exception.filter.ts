import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GlobalCustomError } from '../exception/global-exeption';

@Catch(GlobalCustomError)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('global exception filter ', exception);
  }
}
