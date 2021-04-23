import { Controller, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from '../../configuration/auth/jwt.guard';
import { UsersService } from '../../application/users.service';
import { Project, User } from '../../infrastructure/database/entities';
import { propOf } from '../../shared/propOf';

class UserDTO extends PartialType(OmitType(User, ['password'] as const)) {}

class UpdateUserDTO extends PartialType(
  PickType(User, ['name', 'surname', 'email'] as const),
) {}

@Crud({
  model: {
    type: UserDTO,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase', 'createOneBase'],
  },
  query: {
    exclude: [propOf<User>('password')],
    join: {
      projects: {
        eager: false,
        exclude: [propOf<Project>('userId')],
      },
      'projects.user': {
        eager: false,
        exclude: [propOf<User>('password')],
        alias: 'projects_user',
      },
    },
  },
  dto: {
    update: UpdateUserDTO,
  },
})
@UseGuards(JwtAuthGuard)
@CrudAuth({
  property: 'user',
  filter: (user: User) => {
    return { id: user.id };
  },
})
@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}
}

export { UsersController };
