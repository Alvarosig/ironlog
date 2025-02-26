import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workout } from './workout.entity';
import { Progress } from './progress.entity';
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

  @OneToMany(() => Progress, (progress) => progress.exercise, {
    cascade: true,
  })
  progressions: Progress[];

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: 'CASCADE' })
  user: User;
}
