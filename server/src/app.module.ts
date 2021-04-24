import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import {
  AuthModule,
  DatabaseModule,
  GlobalConfigModule,
  ServeClientModule,
} from './configuration';
import { BcryptService } from './infrastructure/auth/bcrypt.service';
import * as Services from './application';
import * as RestControllers from './presentation/rest';
import { EmailService } from './infrastructure/email/email.service';
import { EventsGateway } from './presentation/ws/events.gateway';

@Module({
  imports: [
    GlobalConfigModule,
    ServeClientModule,
    DatabaseModule,
    AuthModule,
    TerminusModule,
  ],
  controllers: [...Object.values(RestControllers)],
  providers: [
    ...Object.values(Services),
    BcryptService,
    EmailService,
    EventsGateway,
  ],
})
export class AppModule {}
