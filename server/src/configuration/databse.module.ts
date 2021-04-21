import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalConfig, GlobalConfigKey } from './configs/global.config';

const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) =>
    configService.get<GlobalConfig>(GlobalConfigKey).database,
  inject: [ConfigService],
});

export { DatabaseModule };
