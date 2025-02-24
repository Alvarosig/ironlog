import { faker } from '@faker-js/faker';
import { User } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  user.name = faker.person.firstName();
  user.email = faker.internet.email();
  user.password = faker.internet.password({
    length: 6,
  });

  return user;
});
