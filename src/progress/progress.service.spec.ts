import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseProgressService } from './progress.service';

describe('ExerciseProgressService', () => {
  let service: ExerciseProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseProgressService],
    }).compile();

    service = module.get<ExerciseProgressService>(ExerciseProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
