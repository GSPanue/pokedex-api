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

        const isSuccessful = res.statusCode >= 200 && res.statusCode < 300;
        const isUnsuccessful = res.statusCode >= 400 && res.statusCode < 600;

        if (isSuccessful) {
          const etag = ETag(JSON.stringify(data));
          const doesMatchETag = req.headers['if-none-match'] === etag;

          res.setHeader('Cache-Control', 'max-age=3600, public');
          res.setHeader('ETag', etag);

          if (doesMatchETag) {
            res.status(304);

            return;
          }
          /**
           * @todo Set custom headers
           */
          return data;
        } else if (isUnsuccessful) {
          res.setHeader('Cache-Control', 'no-store, must-revalidate');
        }
      }),
    );
  }
}
