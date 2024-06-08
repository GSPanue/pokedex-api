import { Injectable, NestInterceptor } from '@nestjs/common';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as ETag from 'etag';

import type { CallHandler, ExecutionContext } from '@nestjs/common';
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

        if (isSuccessful) {
          const etag = ETag(JSON.stringify(data));
          const doesMatchETag = req.headers['if-none-match'] === etag;

          const itemCount = data.length;

          res.setHeader('Cache-Control', 'max-age=3600, public');
          res.setHeader('ETag', etag);
          res.setHeader('X-Item-Count', itemCount);

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
      catchError((error) => {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();

        const isUnsuccessful = res.statusCode >= 400 && res.statusCode < 600;

        if (isUnsuccessful) {
          res.setHeader('Cache-Control', 'no-store, must-revalidate');
        }

        return throwError(error);
      }),
    );
  }
}
