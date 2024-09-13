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

import { createCacheKey } from '../utils';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getPokemonById(id) {
    let cacheKey = createCacheKey(`id:${id}`);

    // Get data cache keys
    const dataCacheKeys: any = await this.cacheManager.get(cacheKey);

    const cachedResults = [];

    if (dataCacheKeys) {
      // Get Pokemon data from cache using keys
      for (const key of dataCacheKeys) {
        cacheKey = createCacheKey(`data:${key}`);

        const cachedResult = await this.cacheManager.get(cacheKey);

        cachedResults.push(cachedResult);
      }
    }

    return cachedResults;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const path = req.route.path;

    const { params } = req;

    const isPokedexResource = path.endsWith('/pokedex');
    const isPokedexWithIdResource = path.endsWith('/pokedex/:id');

    return next.handle().pipe(
      tap(async (response) => {
        const { rawResults, results } = response;

        if (isPokedexResource) {
          // Cache results
        } else if (isPokedexWithIdResource) {
          const { id } = params;

          const cachedResult = await this.getPokemonById(id);

          if (cachedResult.length === 0) {
            // So store them then
          }
        }
      }),
    );
  }
}
