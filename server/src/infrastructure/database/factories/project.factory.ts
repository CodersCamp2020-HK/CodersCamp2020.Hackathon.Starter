import { define, factory } from 'typeorm-seeding';
import { Project, User } from '../entities';
import * as Faker from 'faker';

define(Project, (faker: typeof Faker) => {
  const project = new Project();
  project.name = faker.lorem.word();
  project.description = faker.lorem.paragraph();
  project.user = factory(User)() as any;
  return project;
});
