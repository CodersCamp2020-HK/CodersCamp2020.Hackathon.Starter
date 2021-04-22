import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { GlobalConfig, GlobalConfigKey } from './configs/global.config';

const JwtAuthModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<GlobalConfig>(GlobalConfigKey).auth.jwt.secret,
  }),
  inject: [ConfigService],
});

@Module({
  imports: [JwtAuthModule],
  exports: [JwtAuthModule],
})
class AuthModule {}

export { AuthModule };
