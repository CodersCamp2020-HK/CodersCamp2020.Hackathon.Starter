import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

@Exclude()
class EnvironmentVariables {
  @Expose()
  @IsEnum(Environment)
  readonly NODE_ENV: Environment;

  @Expose()
  @IsNumber()
  readonly PORT: number;

  @Expose()
  @IsString()
  readonly JWT_KEY: string;

  @Expose()
  @IsEnum(['postgres'])
  readonly TYPEORM_CONNECTION: 'postgres';

  @Expose()
  @IsString()
  readonly TYPEORM_HOST: string;

  @Expose()
  @IsString()
  readonly TYPEORM_USERNAME: string;

  @Expose()
  @IsString()
  readonly TYPEORM_PASSWORD: string;

  @Expose()
  @IsString()
  readonly TYPEORM_DATABASE: string;

  @Expose()
  @IsNumber()
  readonly TYPEORM_PORT: number;

  @Expose()
  @IsBoolean()
  readonly TYPEORM_SYNCHRONIZE: boolean;

  @Expose()
  @IsBoolean()
  readonly TYPEORM_LOGGING: boolean;

  @Expose()
  @IsString()
  readonly TYPEORM_ENTITIES_DIR: string;

  @Expose()
  @IsString()
  readonly TYPEORM_MIGRATIONS_DIR: string;

  readonly DATABASE_URL?: string;
}

export { EnvironmentVariables, Environment };
