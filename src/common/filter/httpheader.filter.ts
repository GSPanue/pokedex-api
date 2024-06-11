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

    res.removeHeader('ETag');
    res.removeHeader('X-Total-Count');
    res.removeHeader('X-Item-Count');
    res.removeHeader('X-Page-Count');
    res.removeHeader('X-Current-Page');
    res.removeHeader('X-Page-Size');
    res.removeHeader('X-Has-Next-Page');
    res.removeHeader('X-Has-Previous-Page');

    const exceptionStatus = exception.getStatus();
    const exceptionRes = exception.getResponse();

    res.status(exceptionStatus).json(exceptionRes);
  }
}
