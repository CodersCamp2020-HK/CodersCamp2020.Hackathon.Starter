import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @Expose()
  readonly DATABASE_URL?: string;

  @Expose()
  readonly GOOGLE_EMAIL_USER?: string;

  @Expose()
  readonly GOOGLE_EMAIL_PASSWORD?: string;
}

export { EnvironmentVariables, Environment };
