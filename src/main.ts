import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const instance = app.getHttpAdapter().getInstance();

  instance.set('etag', false);

  await app.listen(3000);
}

bootstrap();
