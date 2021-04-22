import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './configuration';

export function appFactory() {
  return NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['error', 'warn'],
  }).then((app) => setupSwagger(app));
}
