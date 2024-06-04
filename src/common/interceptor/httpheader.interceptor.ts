import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

import type { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();

        const isOK = res.statusCode >= 200 && res.statusCode < 300;

        if (isOK) {
          /**
           * @todo Set headers
           */
        }
      }),
    );
  }
}
