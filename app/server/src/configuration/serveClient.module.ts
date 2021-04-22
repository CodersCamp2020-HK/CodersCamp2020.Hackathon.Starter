import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GlobalConfig, GlobalConfigKey } from './configs/global.config';

const ServeClientModule = ServeStaticModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) =>
    configService.get<GlobalConfig>(GlobalConfigKey).static,
  inject: [ConfigService],
});

export { ServeClientModule };
