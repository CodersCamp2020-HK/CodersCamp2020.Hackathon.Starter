import { registerAs } from '@nestjs/config';
import { plainToClass, Type } from 'class-transformer';
import {
  IsDefined,
  IsNumber,
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

  readonly static: ServeStaticModuleOptions[];

  readonly database: TypeOrmModuleOptions;
}

const srcPath = path.join(__dirname, "../../");

const GlobalConfigKey = "GLOBAL_CONFIG";
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
  const globalConfig: GlobalConfig = {
    http: {
      port: env.PORT,
      url:
        env.NODE_ENV !== Environment.Production
          ? `http://localhost:${env.PORT}`
          : "https://hackathon.herokuapp.com/",
    },
    database: {
      type: env.TYPEORM_CONNECTION,
      url:
        env.DATABASE_URL ??
        `postgres://${env.TYPEORM_USERNAME}:${env.TYPEORM_PASSWORD}@${env.TYPEORM_HOST}:${env.TYPEORM_PORT}/${env.TYPEORM_DATABASE}`,
      ssl: env.DATABASE_URL ? { rejectUnauthorized: false } : false,
      entities: [path.join(entitiesDir, "/**/*")],
      migrations: [path.join(migrationsDir, "/**/*")],
      cli: {
        migrationsDir,
        entitiesDir,
      },
      synchronize: env.TYPEORM_SYNCHRONIZE,
      autoLoadEntities: true,
    },
    static: [
      {
        rootPath: path.join(srcPath, "/presentation/client"),
      },
    ],
    swagger: {
      title: "App example",
      description: "The app API description",
      version: "1.0.0",
      path: "api",
    },
    auth: {
      jwt: {
        secret: env.JWT_KEY,
      },
      bcrypt: {
        rounds: 10,
      },
    },
  };
  Logger.verbose(globalConfig, 'GlobalConfig');
  return validateConfig(GlobalConfig, globalConfig);
});

export {
  GlobalConfigFactory,
  GlobalConfigKey,
  GlobalConfig,
  SwaggerConfig,
  BcryptConfig,
  HttpConfig,
};
