import { faker } from '@faker-js/faker';
import { ExerciseProgress } from '../entities/exerciseProgress.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ExerciseProgressFactory = setSeederFactory(
  ExerciseProgress,
  () => {
    const exerciseProgress = new ExerciseProgress();
    exerciseProgress.reps = faker.number.int({
      min: 4,
      max: 20,
    });
    exerciseProgress.weight = faker.number.int({
      min: 1,
      max: 400,
    });
    exerciseProgress.date = faker.date.recent({
      days: 20,
    });

    return exerciseProgress;
  },
);
