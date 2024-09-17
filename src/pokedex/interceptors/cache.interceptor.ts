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
  ICacheQueryResponse,
  ICacheDataResponse,
  ICacheResponse,
} from '../interfaces';

@Injectable()
export class CacheInterceptor implements ICacheInterceptor, NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async cachePokemonQuery(
    key: string,
    data: Pokemon[],
    count: number,
  ): Promise<void> {
    const cacheKey = createCacheKey(key);

    // Create data cache keys
    const dataCacheKeys: string[] = data.map((datum) =>
      createCacheKey(`data:${datum.id}`),
    );

    // Cache query using the query as the key with the cache data keys and count as the value
    await this.cacheManager.set(cacheKey, {
      results: dataCacheKeys,
      count,
    });
  }

  async cachePokemonData(id: number, data: IPokemon): Promise<void> {
    const cacheKey = createCacheKey(`data:${id}`);

    // Get data from cache
    const cachedResult =
      await this.cacheManager.get<ICacheDataResponse>(cacheKey);

    // Ensure data is not cached already
    if (!cachedResult) {
      // Cache data
      await this.cacheManager.set(cacheKey, {
        results: data,
      });
    }
  }

  async retrievePokemon(key: string): Promise<ICacheResponse> {
    // Get full data cache keys assigned to cached query
    const cachedResult = await this.retrievePokemonQuery(key);

    // Check if there are results from the cache
    if (cachedResult) {
      const { results: dataCacheKeys, count } = cachedResult;

      // Obtain the full data using the data cache keys
      const results = await this.retrievePokemonData(dataCacheKeys);

      // Return cached results
      return {
        results,
        count,
      };
    }

    // Return no results
    return {
      results: [],
      count: 0,
    };
  }

  async retrievePokemonQuery(key: string): Promise<ICacheQueryResponse> {
    const cacheKey = createCacheKey(key);

    // Get data cache keys assigned to query from cache
    const cachedResults =
      await this.cacheManager.get<ICacheQueryResponse>(cacheKey);

    // Return data cache keys
    if (cachedResults) return cachedResults;

    return;
  }

  async retrievePokemonData(keys: string[]): Promise<IPokemon[]> {
    // Retrieve full data from cache using the provided data cache keys
    const cachedResults: IPokemon[] = await Promise.all(
      keys.map(async (key) => {
        const cachedResult =
          await this.cacheManager.get<ICacheDataResponse>(key);

        return cachedResult.results;
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

    let cachedResults: ICacheResponse;

    // Using the query as the key, check cache for data
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

    const { results, count } = cachedResults;

    const hasResults: boolean = results.length > 0;

    // Return data from cache
    if (hasResults) {
      return of({
        results,
        count,
        ...(isPokedexResource && {
          query: {
            ...defaultQuery,
            ...query,
          },
        }),
      });
    }

    // Otherwise, cache query and data
    return next.handle().pipe(
      tap(async (response: IPokedexResponse) => {
        const { query, rawResults, results, count } = response;

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
        if (cacheKey) await this.cachePokemonQuery(cacheKey, rawResults, count);

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
