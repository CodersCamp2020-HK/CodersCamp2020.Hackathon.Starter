import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../infrastructure/database/entities';

@Injectable()
class ProjectsService extends TypeOrmCrudService<Project> {
  constructor(@InjectRepository(Project) usersRepository: Repository<Project>) {
    super(usersRepository);
  }
}

export { ProjectsService };
