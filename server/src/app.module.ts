import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { GlobalConfigModule, ServeClientModule } from './configuration';
import * as Services from './application';
import * as RestControllers from './presentation/rest';
import { EmailService } from './infrastructure/email/email.service';
import { MeetingGateway } from './presentation/ws/meeting.gateway';

@Module({
  imports: [GlobalConfigModule, ServeClientModule, TerminusModule],
  controllers: [...Object.values(RestControllers)],
  providers: [...Object.values(Services), EmailService, MeetingGateway],
})
export class AppModule {}
