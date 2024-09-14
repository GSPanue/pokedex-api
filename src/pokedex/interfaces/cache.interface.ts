import type { ExecutionContext, CallHandler } from '@nestjs/common';
import type { Observable } from 'rxjs';

import type { Pokemon } from '@entities';
import type { IPokemon } from '.';

export interface ICacheInterceptor {
  cachePokemonQuery(key: string, data: Pokemon[]): Promise<void>;

  cachePokemonData(id: number, data: IPokemon): Promise<void>;

  retrievePokemon(key: string): Promise<IPokemon[]>;

  retrievePokemonQuery(key: string): Promise<string[]>;

  retrievePokemonData(keys: string[]): Promise<IPokemon[]>;

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>>;
}

export interface ICreateCacheKey {
  (value: string): string;
}
