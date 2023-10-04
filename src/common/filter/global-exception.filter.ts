import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {}
}
