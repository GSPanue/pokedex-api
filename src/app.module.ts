import { Module, NestModule } from '@nestjs/common';

import type { MiddlewareConsumer } from '@nestjs/common';

import { PokedexModule } from './pokedex';
import { HttpHeaderMiddleware } from '@src/common';

@Module({
  imports: [PokedexModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpHeaderMiddleware).forRoutes('*');
  }
}
