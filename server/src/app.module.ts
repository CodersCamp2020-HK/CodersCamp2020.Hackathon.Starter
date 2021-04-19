import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthcheckController } from './presentation/rest/healthcheck.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthcheckController],
  providers: [],
})
export class AppModule { }
