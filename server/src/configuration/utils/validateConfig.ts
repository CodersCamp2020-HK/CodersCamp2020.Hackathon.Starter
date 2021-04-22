import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/ban-types
function validateConfig<T extends object>(cls: ClassConstructor<T>, config: T) {
  const validatedConfig = plainToClass(cls, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export { validateConfig };
