import { Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import type { MiddlewareConsumer } from '@nestjs/common';

import { createDefaultConfig } from '@config';
import {
  HttpHeaderMiddleware,
  HttpHeaderFilter,
  HttpHeaderInterceptor,
} from '@common';
import { PokedexModule } from './pokedex';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: createDefaultConfig,
    }),
    PokedexModule,
  ],
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
