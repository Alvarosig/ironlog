import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  update_date: Date;

  @OneToMany(() => Workout, (workout) => workout.user, { cascade: true })
  workouts: Workout[];

  @OneToMany(() => Exercise, (exercise) => exercise.user, { cascade: true })
  exercises: Exercise[];
}
