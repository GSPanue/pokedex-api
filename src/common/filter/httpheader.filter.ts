import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpHeaderFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    res.setHeader('Cache-Control', 'no-store, must-revalidate');

    const exceptionStatus = exception.getStatus();
    const exceptionRes = exception.getResponse();

    res.status(exceptionStatus).json(exceptionRes);

    // throw exception;
  }
}
