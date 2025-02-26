import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseProgressController } from './exercise-progress.controller';

describe('ExerciseProgressController', () => {
  let controller: ExerciseProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerciseProgressController],
    }).compile();

    controller = module.get<ExerciseProgressController>(ExerciseProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
