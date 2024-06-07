import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import * as ETag from 'etag';

import type { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        const isOK = res.statusCode >= 200 && res.statusCode < 300;

        if (isOK) {
          const etag = ETag(JSON.stringify(data));
          const doesMatchETag = req.headers['if-none-match'] === etag;

          res.setHeader('ETag', etag);

          if (doesMatchETag) {
            res.status(304);

            return;
          }
          /**
           * @todo Set custom headers
           */
          return data;
        }
      }),
    );
  }
}
