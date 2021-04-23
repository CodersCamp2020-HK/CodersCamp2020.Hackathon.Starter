import { registerAs } from '@nestjs/config';
import { plainToClass, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Environment, EnvironmentVariables } from './environment.config';
import { validateConfig } from '../shared/validateConfig';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
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
class JwtConfig {
  @IsString()
  secret: string;

  @IsBoolean()
  ignoreExpiration: boolean;
}

class BcryptConfig {
  @IsNumber()
  rounds: number;
}

class AuthConfig {
  @IsDefined()
  @ValidateNested()
  @Type(() => JwtConfig)
  jwt: JwtConfig;

  @IsDefined()
  @ValidateNested()
  @Type(() => BcryptConfig)
  bcrypt: BcryptConfig;
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
  @Type(() => AuthConfig)
  readonly auth: AuthConfig;

  @ValidateNested()
  @Type(() => EmailConfig)
  readonly email: EmailConfig;

  readonly static: ServeStaticModuleOptions[];

  readonly database: TypeOrmModuleOptions;

  @ValidateNested()
  @Type(() => EnvironmentVariables)
  readonly env: EnvironmentVariables;
}

const srcPath = path.join(__dirname, '../../');

const GlobalConfigKey = 'GLOBAL_CONFIG';
const GlobalConfigFactory = registerAs(GlobalConfigKey, () => {
  const env = plainToClass(EnvironmentVariables, process.env);
  const entitiesDir = path.join(
    srcPath,
    env.TYPEORM_ENTITIES_DIR.replace(/^src/, ''),
  );
  const migrationsDir = path.join(
    srcPath,
    env.TYPEORM_MIGRATIONS_DIR.replace(/^src/, ''),
  );
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
    database: {
      type: env.TYPEORM_CONNECTION,
      url:
        env.NODE_ENV !== Environment.Production
          ? `postgres://${env.TYPEORM_USERNAME}:${env.TYPEORM_PASSWORD}@${env.TYPEORM_HOST}:${env.TYPEORM_PORT}/${env.TYPEORM_DATABASE}`
          : env.DATABASE_URL,
      ssl:
        env.NODE_ENV === Environment.Production
          ? { rejectUnauthorized: false }
          : false,
      entities: [path.join(entitiesDir, '/**/*')],
      migrations: [path.join(migrationsDir, '/**/*')],
      cli: {
        migrationsDir,
        entitiesDir,
      },
      synchronize: env.TYPEORM_SYNCHRONIZE,
      autoLoadEntities: true,
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
    auth: {
      jwt: {
        secret: env.JWT_KEY,
        ignoreExpiration: env.NODE_ENV !== Environment.Production,
      },
      bcrypt: {
        rounds: 10,
      },
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
  BcryptConfig,
  HttpConfig,
  EmailConfig,
  EmailAuthConfig,
};
