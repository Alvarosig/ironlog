import { pgConfig } from '../../dbConfig';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { UserFactory } from './user.factory';
import { ExerciseFactory } from './exercise.factory';
import { ExerciseProgressFactory } from './exerciseProgress.factory';
import { WorkoutFactory } from './workout.factory';
import { MainSeeder } from './main.seeder';

const options: DataSourceOptions & SeederOptions = {
  ...pgConfig,
  factories: [
    UserFactory,
    ExerciseFactory,
    ExerciseProgressFactory,
    WorkoutFactory,
  ],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
