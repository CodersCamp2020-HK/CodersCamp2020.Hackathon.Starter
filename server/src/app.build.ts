import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configuration';

export function appFactory() {
  return NestFactory.create(AppModule).then((app) => setupSwagger(app));
}
