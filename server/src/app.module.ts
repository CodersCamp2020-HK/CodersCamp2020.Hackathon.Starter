import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import {
  DatabaseModule,
  GlobalConfigModule,
  ServeClientModule,
} from './configuration';
import { HealthcheckController } from './presentation/rest/healthcheck.controller';

@Module({
  imports: [
    GlobalConfigModule,
    ServeClientModule,
    DatabaseModule,
    TerminusModule,
  ],
  controllers: [HealthcheckController],
  providers: [],
})
export class AppModule {}
