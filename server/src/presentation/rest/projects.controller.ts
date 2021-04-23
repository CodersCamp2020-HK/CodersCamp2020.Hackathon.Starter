import { Controller, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ProjectsService } from '../../application/projects.service';
import { UsersService } from '../../application/users.service';
import { JwtAuthGuard } from '../../configuration/auth/jwt.guard';
import { Project, User } from '../../infrastructure/database/entities';

@Crud({
  model: {
    type: Project,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@UseGuards(JwtAuthGuard)
@CrudAuth({
  property: 'user',
  filter: (user: User) => {
    return { userId: user.id };
  },
})
@ApiBearerAuth()
@ApiTags('Project')
@Controller('projects')
class ProjectsController implements CrudController<Project> {
  constructor(public service: ProjectsService) {}
}

export { ProjectsController };
