import { Logger } from '@nestjs/common';
import { appFactory } from './app.build';

const APP_PORT = 8000;
const APP_URL = `http://localhost:${APP_PORT}`;

async function bootstrap() {
  const app = await appFactory();
  await app.listen(APP_PORT).then(() => {
    Logger.log(`Nest application listening at ${APP_URL}`, 'NestApplication');
  });
}

bootstrap();
