import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Exercise } from './exercise.entity';
import { User } from './user.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Exercise, { cascade: true })
  @JoinTable({
    name: 'workout_exercise',
    joinColumn: {
      name: 'workout_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'exercise_id',
      referencedColumnName: 'id',
    },
  })
  exercises: Exercise[];

  @ManyToOne(() => User, (user) => user.workouts, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  user: User;
}
