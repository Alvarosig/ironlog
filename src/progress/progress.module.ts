import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { Progress } from 'src/entities/progress.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Progress])],
  providers: [ProgressService],
  controllers: [ProgressController],
})
export class ProgressModule {}
