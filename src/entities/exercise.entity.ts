import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';

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
}
