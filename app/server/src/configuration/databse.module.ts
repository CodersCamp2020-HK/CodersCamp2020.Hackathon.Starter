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
@Module({
  imports: [DatabaseConnection, DatabaseFeatures],
  exports: [DatabaseConnection, DatabaseFeatures],
})
class DatabaseModule {}

export { DatabaseModule };
