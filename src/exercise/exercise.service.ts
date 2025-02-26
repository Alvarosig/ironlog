import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercise.entity';
import { Repository } from 'typeorm';
import { CreateExerciseZodDTO } from './dto/createExerciseZod.dto';
import { UpdateExerciseZodDTO } from './dto/updateExerciseZod.dto';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async findOne(id: number) {
    const exercise = await this.exerciseRepository.findOne({
      where: {
        id,
      },
      relations: ['progressions'],
    });

    if (!exercise) throw new NotFoundException();

    return {
      ...exercise,
      progressions: exercise.progressions.map(({ id, reps, weight, date }) => ({
        id,
        reps,
        weight,
        date,
      })),
    };
  }

  async findAll() {
    const exercises = await this.exerciseRepository.find();

    if (!exercises) throw new NotFoundException();

    return exercises;
  }

  async create(dto: CreateExerciseZodDTO) {
    return await this.exerciseRepository.save(dto);
  }

  async update(id: number, dto: UpdateExerciseZodDTO) {
    const exercise = await this.exerciseRepository.findOne({
      where: {
        id,
      },
    });

    if (!exercise) throw new NotFoundException();

    await this.exerciseRepository.update({ id }, dto);

    return this.exerciseRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const exercise = await this.exerciseRepository.findOne({ where: { id } });

    if (!exercise) throw new NotFoundException('Exercício não encontrado');

    await this.exerciseRepository.delete({ id });
  }
}
