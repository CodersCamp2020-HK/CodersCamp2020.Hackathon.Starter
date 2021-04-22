import { Controller } from '@nestjs/common';
import {
  ApiTags,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UsersService } from 'src/application/users.service';
import { Project, User } from 'src/infrastructure/database/entities';
import { propOf } from 'src/shared/propOf';

class UserDTO extends PartialType(OmitType(User, ['password'] as const)) {}

class CreateUserDTO extends IntersectionType(
  PickType(User, ['email', 'password'] as const),
  PartialType(PickType(User, ['name', 'surname'] as const)),
) {}

class UpdateUserDTO extends PartialType(
  PickType(User, ['name', 'surname', 'email'] as const),
) {}

@Crud({
  model: {
    type: UserDTO,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
  query: {
    exclude: [propOf<User>('password')],
    join: {
      projects: {
        eager: false,
        exclude: [propOf<Project>('userId')],
      },
    },
  },
  dto: {
    create: CreateUserDTO,
    update: UpdateUserDTO,
  },
})
@ApiTags('User')
@Controller('users')
class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}

export { UsersController };
