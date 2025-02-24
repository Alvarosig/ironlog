import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from 'src/entities/workout.entity';
import { User } from 'src/entities/user.entity';
import { Exercise } from 'src/entities/exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, User, Exercise])],
  controllers: [WorkoutController],
  providers: [WorkoutService],
})
export class WorkoutModule {}
