import { faker } from '@faker-js/faker';
import { Progress } from '../entities/progress.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ProgressFactory = setSeederFactory(Progress, () => {
  const progress = new Progress();
  progress.reps = faker.number.int({
    min: 4,
    max: 20,
  });
  progress.weight = faker.number.int({
    min: 1,
    max: 400,
  });
  progress.date = faker.date.recent({
    days: 20,
  });

  return progress;
});
