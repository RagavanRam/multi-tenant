import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  app.use(tenancyMiddleware);

  await app.listen(3000);
}
bootstrap().then();
