import { registerAs } from '@nestjs/config';
import { plainToClass, Type } from 'class-transformer';
import { IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';
import { Environment, EnvironmentVariables } from './environment.config';
import { validateConfig } from '../utils/validateConfig';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import * as path from 'path';

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

class GlobalConfig {
  @ValidateNested()
  @Type(() => HttpConfig)
  readonly http: HttpConfig;

  @ValidateNested()
  @Type(() => SwaggerConfig)
  readonly swagger: SwaggerConfig;

  readonly static: ServeStaticModuleOptions[];

  readonly database: TypeOrmModuleOptions;
}

const srcPath = path.join(__dirname, '../../');

const GlobalConfigKey = 'GLOBAL_CONFIG';
const GlobalConfigFactory = registerAs(GlobalConfigKey, () => {
  const env = plainToClass(EnvironmentVariables, process.env);
  const entitiesDir = path.join(
    srcPath,
    env.TYPEORM_ENTITIES_DIR.replace(/^\/src/, ''),
  );
  const migrationsDir = path.join(
    srcPath,
    env.TYPEORM_MIGRATIONS_DIR.replace(/^\/src/, ''),
  );
  const globalConfig: GlobalConfig = {
    http: {
      port: env.PORT,
      url:
        env.NODE_ENV !== Environment.Production
          ? `http://localhost:${env.PORT}`
          : 'https://hackathon.herokuapp.com/',
    },
    database: {
      type: env.TYPEORM_CONNECTION,
      host: env.TYPEORM_HOST,
      port: env.TYPEORM_PORT,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      database: env.TYPEORM_DATABASE,
      entities: [path.join(entitiesDir, '/**/*')],
      migrations: [path.join(migrationsDir, '/**/*')],
      cli: {
        migrationsDir,
        entitiesDir,
      },
      synchronize: env.TYPEORM_SYNCHRONIZE,
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
  };
  return validateConfig(GlobalConfig, globalConfig);
});

export {
  GlobalConfigFactory,
  GlobalConfigKey,
  GlobalConfig,
  SwaggerConfig,
  HttpConfig,
};
