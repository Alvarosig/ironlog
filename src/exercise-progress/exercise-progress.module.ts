import { Module } from '@nestjs/common';
import { ExerciseProgressService } from './exercise-progress.service';
import { ExerciseProgressController } from './exercise-progress.controller';
import { ExerciseProgress } from 'src/entities/exerciseProgress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseProgress])],
  providers: [ExerciseProgressService],
  controllers: [ExerciseProgressController],
})
export class ExerciseProgressModule {}
