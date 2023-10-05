import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GlobalCustomException } from '../exception/global-exeption';

@Catch(GlobalCustomException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: GlobalCustomException, host: ArgumentsHost) {
    console.log('global exception filter ', exception);
  }
}
