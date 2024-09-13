import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const path = req.route.path;

    const isPokedexResource = path.endsWith('/pokedex');
    const isPokedexWithIdResource = path.endsWith('/pokedex/:id');

    return next.handle().pipe(
      tap(async (response) => {
        const { query, rawResults, results } = response;

        if (isPokedexResource) {
          // Cache results
        } else if (isPokedexWithIdResource) {
          // Cache results
        }
      }),
    );
  }
}
