import { Factory, Seeder } from 'typeorm-seeding';
import { Project, User } from '../entities';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)()
      .map(async (user: User) => {
        user.projects = await factory(Project)().createMany(3);
        return user;
      })
      .createMany(5);
  }
}
