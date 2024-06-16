import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

import { AppModule } from '@src/app.module';
import { badRequestException } from '@src/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const instance = app.getHttpAdapter().getInstance();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: () => {
        return new BadRequestException(badRequestException);
      },
    }),
  );

  instance.set('etag', false);

  await app.listen(3000);
}

bootstrap();
