import {
  Injectable,
  HttpException,
  NestInterceptor,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as ETag from 'etag';

import type { CallHandler, ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    return next.handle().pipe(
      tap(({ query, results }) => {
        const isSuccessful = res.statusCode >= 200 && res.statusCode < 300;

        // Set headers for successful responses
        if (isSuccessful) {
          const etag = ETag(JSON.stringify(results));
          const doesMatchETag = req.headers['if-none-match'] === etag;

          res.setHeader('Cache-Control', 'max-age=3600, public');
          res.setHeader('ETag', etag);

          // Return 304 if match is found
          if (doesMatchETag) {
            res.status(304);

            return;
          }

          const itemCount = results.length;

          res.setHeader('X-Item-Count', itemCount);

          const path = req.route.path;

          const isPokedexRoute = path.startsWith('/pokedex');

          // Apply custom headers for certain routes
          if (isPokedexRoute) {
            if (path === '/pokedex') {
              const { limit } = query;

              /**
               * @todo Set custom headers for /pokedex
               */
              res.setHeader('X-Total-Count', null);
              res.setHeader('X-Page-Count', null);
              res.setHeader('X-Current-Page', null);
              res.setHeader('X-Page-Size', limit);
              res.setHeader('X-Has-Next-Page', null);
              res.setHeader('X-Has-Previous-Page', null);
            }
          }
        }
      }),
      map(({ results }) => results),
      catchError((err) => {
        console.error(err);

        // Re-throw HttpException
        if (err instanceof HttpException) {
          throw err;
        }

        // Otherwise, create a new Internal Server Error exception
        throw new InternalServerErrorException('Internal Server Error');
      }),
    );
  }
}
