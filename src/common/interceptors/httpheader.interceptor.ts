import {
  Injectable,
  HttpException,
  NestInterceptor,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import * as ETag from 'etag';

import {
  calculateItemCount,
  calculatePageCount,
  calculateCurrentPage,
  calculatePageSize,
  hasNextPage,
  hasPreviousPage,
} from '@common';

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
      tap(({ query, results, count }) => {
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

          const itemCount = calculateItemCount(results);

          res.setHeader('X-Item-Count', itemCount);

          const path = req.route.path;

          const isPokedexRoute = path.startsWith('/api/v1/pokedex');

          // Apply custom headers for certain routes
          if (isPokedexRoute) {
            if (path === '/api/v1/pokedex') {
              const { limit, offset } = query;

              const totalCount = count;
              const pageCount = calculatePageCount(limit, count);
              const currentPage = calculateCurrentPage(offset);
              const pageSize = calculatePageSize(limit);
              const nextPage = hasNextPage(offset, pageCount);
              const previousPage = hasPreviousPage(offset, pageCount);

              res.setHeader('X-Total-Count', totalCount);
              res.setHeader('X-Page-Count', pageCount);
              res.setHeader('X-Current-Page', currentPage);
              res.setHeader('X-Page-Size', pageSize);
              res.setHeader('X-Has-Next-Page', nextPage);
              res.setHeader('X-Has-Previous-Page', previousPage);
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
