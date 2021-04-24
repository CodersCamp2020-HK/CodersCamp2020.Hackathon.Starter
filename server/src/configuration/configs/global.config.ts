import { registerAs } from '@nestjs/config';
import { plainToClass, Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Environment, EnvironmentVariables } from './environment.config';
import { validateConfig } from '../shared/validateConfig';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import * as path from 'path';
import { Logger } from '@nestjs/common';

class SwaggerConfig {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly version: string;

  @IsString()
  readonly path: string;
}

class HttpConfig {
  @IsNumber()
  readonly port: number;

  @IsUrl({ require_tld: false })
  readonly url: string;
}

class EmailAuthConfig {
  @IsEmail()
  @IsOptional()
  user: string;

  @IsString()
  @IsOptional()
  password: string;
}

class EmailConfig {
  @IsString()
  readonly sender: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => EmailAuthConfig)
  readonly auth?: EmailAuthConfig;
}

class GlobalConfig {
  @ValidateNested()
  @Type(() => HttpConfig)
  readonly http: HttpConfig;

  @ValidateNested()
  @Type(() => SwaggerConfig)
  readonly swagger: SwaggerConfig;

  @ValidateNested()
  @Type(() => EmailConfig)
  readonly email: EmailConfig;

  readonly static: ServeStaticModuleOptions[];

  @ValidateNested()
  @Type(() => EnvironmentVariables)
  readonly env: EnvironmentVariables;
}

const srcPath = path.join(__dirname, '../../');

const GlobalConfigKey = 'GLOBAL_CONFIG';
const GlobalConfigFactory = registerAs(GlobalConfigKey, () => {
  const env = plainToClass(EnvironmentVariables, process.env);
  const emailAuthConfig =
    env.GOOGLE_EMAIL_PASSWORD &&
    env.GOOGLE_EMAIL_USER &&
    env.GOOGLE_EMAIL_PASSWORD !== 'undefined' &&
    env.GOOGLE_EMAIL_USER !== 'undefined'
      ? {
          user: env.GOOGLE_EMAIL_USER,
          password: env.GOOGLE_EMAIL_PASSWORD,
        }
      : undefined;
  const globalConfig: GlobalConfig = {
    env,
    http: {
      port: env.PORT,
      url:
        env.NODE_ENV !== Environment.Production
          ? `http://localhost:${env.PORT}`
          : 'https://hackathon.herokuapp.com/',
    },
    static: [
      {
        rootPath: path.join(srcPath, '/presentation/client'),
      },
    ],
    swagger: {
      title: 'App example',
      description: 'The app API description',
      version: '1.0.0',
      path: 'api',
    },
    email: {
      sender: 'Hackathon <hackathon@coderscamp.com>',
      auth: emailAuthConfig,
    },
  };
  if (env.NODE_ENV !== Environment.Production) {
    Logger.verbose(globalConfig, 'GlobalConfig');
  }
  return validateConfig(GlobalConfig, globalConfig);
});

export {
  GlobalConfigFactory,
  GlobalConfigKey,
  GlobalConfig,
  SwaggerConfig,
  HttpConfig,
  EmailConfig,
  EmailAuthConfig,
};
