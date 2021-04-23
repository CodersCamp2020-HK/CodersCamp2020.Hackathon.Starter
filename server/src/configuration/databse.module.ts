import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from '../infrastructure/database/entities';
import { GlobalConfig, GlobalConfigKey } from './configs/global.config';

const DatabaseConnection = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    ...configService.get<GlobalConfig>(GlobalConfigKey).database,
  }),
  inject: [ConfigService],
});
const DatabaseFeatures = TypeOrmModule.forFeature(Object.values(entities));

const imports =
  process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL
    ? []
    : [DatabaseConnection, DatabaseFeatures];
@Module({
  imports,
  exports: imports,
})
class DatabaseModule {}

export { DatabaseModule };
