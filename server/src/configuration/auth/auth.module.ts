import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GlobalConfig, GlobalConfigKey } from '../configs/global.config';
import { JwtAuthGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

const JwtAuthModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<GlobalConfig>(GlobalConfigKey).auth.jwt.secret,
  }),
  inject: [ConfigService],
});

const PassportStrategy = PassportModule.register({
  defaultStrategy: 'jwt',
});

@Module({
  providers: [JwtStrategy, JwtAuthGuard],
  imports: [JwtAuthModule, PassportStrategy, ConfigModule],
  exports: [JwtAuthModule, PassportStrategy, JwtStrategy, JwtAuthGuard],
})
class AuthModule {}

export { AuthModule };
