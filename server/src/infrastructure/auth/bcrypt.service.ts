import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import {
  BcryptConfig,
  GlobalConfig,
  GlobalConfigKey,
} from 'src/configuration/configs/global.config';

@Injectable()
class BcryptService {
  private config: BcryptConfig;
  constructor(configService: ConfigService) {
    this.config = configService.get<GlobalConfig>(GlobalConfigKey).auth.bcrypt;
  }

  hash(password: string) {
    return bcrypt.hash(password, this.config.rounds);
  }

  verify(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

export { BcryptService };
