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
import { MeetingGateway } from './presentation/ws/meeting.gateway';

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
    MeetingGateway,
  ],
})
export class AppModule {}
