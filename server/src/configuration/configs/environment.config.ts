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
  readonly GOOGLE_EMAIL_USER?: string;

  @Expose()
  readonly GOOGLE_EMAIL_PASSWORD?: string;
}

export { EnvironmentVariables, Environment };
