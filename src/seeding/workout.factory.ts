import { faker } from '@faker-js/faker';
import { Workout } from '../entities/workout.entity';
import { setSeederFactory } from 'typeorm-extension';

export const WorkoutFactory = setSeederFactory(Workout, () => {
  const workout = new Workout();
  workout.name = faker.helpers.arrayElement([
    'Treino A',
    'Treino B',
    'Treino C',
    'Treino D',
    'Upper',
    'Lower',
  ]);

  return workout;
});
