import { Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import type { MiddlewareConsumer } from '@nestjs/common';

import {
  HttpHeaderMiddleware,
  HttpHeaderFilter,
  HttpHeaderInterceptor,
} from '@src/common';
import { PokedexModule } from './pokedex';

@Module({
  imports: [PokedexModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpHeaderFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpHeaderInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpHeaderMiddleware).forRoutes('*');
  }
}
