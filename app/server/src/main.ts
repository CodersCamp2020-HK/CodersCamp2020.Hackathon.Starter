import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appFactory } from './app.build';
import {
  GlobalConfig,
  GlobalConfigKey,
} from './configuration/configs/global.config';

async function bootstrap() {
  const app = await appFactory();
  const { http } = app.get(ConfigService).get<GlobalConfig>(GlobalConfigKey);
  await app.listen(http.port).then(() => {
    Logger.log(`Nest application listening at ${http.url}`, 'NestApplication');
  });
}

bootstrap();
