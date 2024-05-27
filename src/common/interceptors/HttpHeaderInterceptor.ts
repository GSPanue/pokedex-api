import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const res = context.switchToHttp().getResponse();

    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Keep-Alive');
    res.removeHeader('Etag');

    return next.handle();
  }
}
