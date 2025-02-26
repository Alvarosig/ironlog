import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from './workout.entity';
import { ExerciseProgress } from './exerciseProgress.entity';
import { User } from './user.entity';

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

  @OneToMany(() => ExerciseProgress, (progress) => progress.exercise, {
    cascade: true,
  })
  progressions: ExerciseProgress[];

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: 'CASCADE' })
  user: User;
}
