import { Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import type { MiddlewareConsumer } from '@nestjs/common';

import { HttpHeaderMiddleware, HttpHeaderInterceptor } from '@src/common';
import { PokedexModule } from './pokedex';

@Module({
  imports: [PokedexModule],
  providers: [
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
