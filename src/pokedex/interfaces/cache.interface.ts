import type { ExecutionContext, CallHandler } from '@nestjs/common';
import type { Observable } from 'rxjs';

import type { Pokemon } from '@entities';
import type { IPokemon } from '.';

export interface ICacheQueryResponse {
  results: string[];
  count: number;
}

export interface ICacheDataResponse {
  results: IPokemon;
}

export interface ICacheResponse {
  results: IPokemon[];
  count: number;
}

export interface ICacheInterceptor {
  cachePokemonQuery(key: string, data: Pokemon[], count: number): Promise<void>;

  cachePokemonData(id: number, data: IPokemon): Promise<void>;

  retrievePokemon(key: string): Promise<ICacheResponse>;

  retrievePokemonQuery(key: string): Promise<ICacheQueryResponse>;

  retrievePokemonData(keys: string[]): Promise<IPokemon[]>;

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>>;
}

export interface ICreateCacheKey {
  (value: string): string;
}
