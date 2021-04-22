import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  GlobalConfig,
  GlobalConfigKey,
  SwaggerConfig,
} from './configs/global.config';

function createSwaggerDocument(
  app: INestApplication,
  options: SwaggerConfig = app
    .get(ConfigService)
    .get<GlobalConfig>(GlobalConfigKey).swagger,
) {
  const config = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version)
    .build();
  return SwaggerModule.createDocument(app, config);
}

function setupSwagger(
  app: INestApplication,
  options: SwaggerConfig = app
    .get(ConfigService)
    .get<GlobalConfig>(GlobalConfigKey).swagger,
) {
  app.setGlobalPrefix(options.path);
  const document = createSwaggerDocument(app, options);
  SwaggerModule.setup(options.path, app, document);
  return app;
}

export { setupSwagger, createSwaggerDocument };
