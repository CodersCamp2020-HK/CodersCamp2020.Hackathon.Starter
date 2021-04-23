import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { User } from '../../infrastructure/database/entities';
import { AuthService } from '../../application/';
import { Exclude, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

class SignInUserDTO extends PickType(User, ['email', 'password'] as const) {}

class SignInRespDTO {
  @ApiProperty()
  access_token: string;
}
class RegisterUserDTO extends IntersectionType(
  SignInUserDTO,
  PartialType(PickType(User, ['name', 'surname'] as const)),
) {}

class RegisterUserRespDTO extends User {
  @Exclude()
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: SignInRespDTO,
  })
  @Post('signin')
  async signin(@Body() dto: SignInUserDTO) {
    return this.authService.signin(dto.email, dto.password);
  }

  @ApiCreatedResponse({
    type: RegisterUserRespDTO,
  })
  @Post('register')
  async register(@Body() body: RegisterUserDTO) {
    const dto = plainToClass(RegisterUserDTO, body);
    const errors = validateSync(dto);
    if (errors.length > 0) throw new BadRequestException(errors.toString());
    const user = await this.authService.register(dto);
    return plainToClass(RegisterUserRespDTO, user);
  }
}

export { AuthController };
