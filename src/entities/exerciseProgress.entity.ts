import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exercise } from './exercise.entity';
import { User } from './user.entity';

@Entity()
export class ExerciseProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.progressions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  reps: number;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @CreateDateColumn()
  date: Date;
}
