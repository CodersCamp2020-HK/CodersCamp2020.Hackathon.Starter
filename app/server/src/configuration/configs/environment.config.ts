import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  readonly NODE_ENV: Environment;

  @IsNumber()
  readonly PORT: number;

  @IsString()
  readonly JWT_KEY: string;

  @IsEnum(['postgres'])
  readonly TYPEORM_CONNECTION: 'postgres';

  @IsString()
  readonly TYPEORM_HOST: string;

  @IsString()
  readonly TYPEORM_USERNAME: string;

  @IsString()
  readonly TYPEORM_PASSWORD: string;

  @IsString()
  readonly TYPEORM_DATABASE: string;

  @IsNumber()
  readonly TYPEORM_PORT: number;

  @IsBoolean()
  readonly TYPEORM_SYNCHRONIZE: boolean;

  @IsBoolean()
  readonly TYPEORM_LOGGING: boolean;

  @IsString()
  readonly TYPEORM_ENTITIES_DIR: string;

  @IsString()
  readonly TYPEORM_MIGRATIONS_DIR: string;

  readonly DATABASE_URL?: string;
}

export { EnvironmentVariables, Environment };
