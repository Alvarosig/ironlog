import { Exercise } from 'src/entities/exercise.entity';
import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress } from 'src/entities/progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Progress, Exercise, User])],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
