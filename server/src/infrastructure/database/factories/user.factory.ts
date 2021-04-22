import { define } from 'typeorm-seeding';
import { User } from '../entities';
import * as Faker from 'faker';
import * as bcrypt from 'bcrypt';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.name = faker.name.findName();
  user.surname = faker.random.word();
  user.password = bcrypt.hashSync(user.surname, 10);
  return user;
});
