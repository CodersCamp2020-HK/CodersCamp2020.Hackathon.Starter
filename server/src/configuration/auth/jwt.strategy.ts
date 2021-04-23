import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalConfig, GlobalConfigKey } from '../configs/global.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtConfig = configService.get<GlobalConfig>(GlobalConfigKey).auth.jwt;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: jwtConfig.ignoreExpiration,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
