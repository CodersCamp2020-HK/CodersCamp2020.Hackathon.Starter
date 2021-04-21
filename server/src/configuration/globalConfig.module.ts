import { ConfigModule } from '@nestjs/config';
import { GlobalConfigFactory } from './configs/global.config';
import { EnvironmentVariables } from './configs/environment.config';
import { validateConfig } from './utils/validateConfig';

const GlobalConfigModule = ConfigModule.forRoot({
  load: [GlobalConfigFactory],
  validate: (cfg) => validateConfig(EnvironmentVariables, cfg),
});

export { GlobalConfigModule };
