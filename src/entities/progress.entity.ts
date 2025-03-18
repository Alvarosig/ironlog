import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.progressions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column()
  reps: number;

  @Column()
  weight: number;

  @CreateDateColumn()
  date: Date;
}
