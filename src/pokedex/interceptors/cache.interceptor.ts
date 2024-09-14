import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { defaultQuery } from '@common';
import { createCacheKey } from '../utils';

import type { Pokemon } from '@entities';
import type {
  ICacheInterceptor,
  IPokemon,
  IPokedexResponse,
} from '../interfaces';

@Injectable()
export class CacheInterceptor implements ICacheInterceptor, NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async cachePokemonQuery(key: string, data: Pokemon[]): Promise<void> {
    const cacheKey = createCacheKey(key);

    // Create data cache keys
    const dataCacheKeys: string[] = data.map((datum) =>
      createCacheKey(`data:${datum.id}`),
    );

    // Store query as key and ids as value
    await this.cacheManager.set(cacheKey, dataCacheKeys);
  }

  async cachePokemonData(id: number, data: IPokemon): Promise<void> {
    const cacheKey = createCacheKey(`data:${id}`);

    // Get data from cache
    const cachedResult = await this.cacheManager.get<IPokemon | undefined>(
      cacheKey,
    );

    // Check if no data exists in cache
    if (!cachedResult) {
      // Store data
      await this.cacheManager.set(cacheKey, data);
    }
  }

  async retrievePokemon(key: string): Promise<IPokemon[]> {
    // Get data cache keys from query
    const dataCacheKeys = await this.retrievePokemonQuery(key);

    const hasDataCacheKeys = dataCacheKeys.length > 0;

    // Check for data cache keys
    if (hasDataCacheKeys) {
      // Return data
      return await this.retrievePokemonData(dataCacheKeys);
    }

    return [];
  }

  async retrievePokemonQuery(key: string): Promise<string[]> {
    const cacheKey = createCacheKey(key);

    // Get data cache keys assigned to query from cache
    const cachedResults = await this.cacheManager.get<string[] | undefined>(
      cacheKey,
    );

    // Return data cache keys
    if (cachedResults) return cachedResults;

    return [];
  }

  async retrievePokemonData(keys: string[]): Promise<IPokemon[]> {
    // Retrieve full data from cache using data cache keys
    const cachedResults: IPokemon[] = await Promise.all(
      keys.map(async (key) => {
        return this.cacheManager.get<IPokemon>(key);
      }),
    );

    return cachedResults;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const path = req.route.path;

    const { query, params } = req;

    const isPokedexResource = path.endsWith('/pokedex');
    const isPokedexWithIdResource = path.endsWith('/pokedex/:id');

    let cachedResults = [];

    // Check cache
    if (isPokedexResource) {
      const {
        limit: defaultLimit,
        offset: defaultOffset,
        sort: defaultSort,
        order: defaultOrder,
      } = defaultQuery;

      const {
        limit = defaultLimit,
        offset = defaultOffset,
        sort = defaultSort,
        order = defaultOrder,
      } = query;

      cachedResults = await this.retrievePokemon(
        `limit:${limit}:offset:${offset}:sort:${sort}:order:${order}`,
      );
    } else if (isPokedexWithIdResource) {
      const { id } = params;

      cachedResults = await this.retrievePokemon(`id:${id}`);
    }

    // Return cached data
    if (cachedResults.length > 0) {
      return of({
        results: cachedResults,
        // @todo Cache count for /pokedex resource for custom headers
        count: cachedResults.length,
        ...(isPokedexResource && {
          query: {
            ...defaultQuery,
            ...query,
          },
        }),
      });
    }

    // Otherwise, cache data
    return next.handle().pipe(
      tap(async (response: IPokedexResponse) => {
        const { query, rawResults, results } = response;

        let cacheKey: string = '';

        // Set query as cache key
        if (isPokedexResource) {
          const { limit, offset, sort, order } = query;

          cacheKey = `limit:${limit}:offset:${offset}:sort:${sort}:order:${order}`;
        } else if (isPokedexWithIdResource) {
          const { id } = params;

          cacheKey = `id:${id}`;
        }

        // Cache key and the pokemon ids as the value
        if (cacheKey) await this.cachePokemonQuery(cacheKey, rawResults);

        // Cache full Pokemon data
        await Promise.all(
          rawResults.map((rawResult, i) => {
            const { id } = rawResult;

            return this.cachePokemonData(id, results[i]);
          }),
        );
      }),
    );
  }
}
