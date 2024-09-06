import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

import { AppModule } from '@src/app.module';
import { badRequestException, globalHttpPrefix } from '@common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const instance = app.getHttpAdapter().getInstance();

  app.enableCors();

  app.setGlobalPrefix(globalHttpPrefix);

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
