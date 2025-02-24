import { faker } from '@faker-js/faker';
import { Exercise } from '../entities/exercise.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ExerciseFactory = setSeederFactory(Exercise, () => {
  const exercise = new Exercise();
  exercise.name = faker.lorem.word();
  exercise.muscleGroup = faker.helpers.arrayElement([
    'Peito',
    'Costas',
    'Pernas',
    'Ombros',
    'Bíceps',
    'Tríceps',
  ]);

  return exercise;
});
