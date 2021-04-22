import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ProjectsService } from './application/projects.service';
import { UsersService } from './application/users.service';
import {
  DatabaseModule,
  GlobalConfigModule,
  ServeClientModule,
} from './configuration';
import { AuthModule } from './configuration/auth.module';
import { BcryptService } from './infrastructure/auth/bcrypt.service';
import * as Services from './application';
import * as RestControllers from './presentation/rest';

@Module({
  imports: [
    GlobalConfigModule,
    ServeClientModule,
    DatabaseModule,
    AuthModule,
    TerminusModule,
  ],
  controllers: [...Object.values(RestControllers)],
  providers: [...Object.values(Services), BcryptService],
})
export class AppModule {}
