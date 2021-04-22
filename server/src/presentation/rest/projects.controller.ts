import { Controller } from '@nestjs/common';
import {
  ApiTags,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { ProjectsService } from '../../application/projects.service';
import { UsersService } from '../../application/users.service';
import { Project, User } from '../../infrastructure/database/entities';

@Crud({
  model: {
    type: Project,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
})
@ApiTags('Project')
@Controller('projects')
class ProjectsController implements CrudController<Project> {
  constructor(public service: ProjectsService) {}
}

export { ProjectsController };
