import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from './workout.entity';
import { ExerciseProgress } from './exerciseProgress.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'muscle_group' })
  muscleGroup: string;

  @ManyToMany(() => Workout, (workout) => workout.exercises)
  workouts: Workout[];

  @OneToMany(() => ExerciseProgress, (progress) => progress.exercise)
  progressions: ExerciseProgress[];
}
