import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthcheckController } from './presentation/rest/healthcheck.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'presentation', 'client'),
    }),
    TerminusModule
  ],
  controllers: [HealthcheckController],
  providers: [],
})
export class AppModule { }
