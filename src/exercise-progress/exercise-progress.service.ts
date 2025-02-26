import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExerciseProgress } from 'src/entities/exerciseProgress.entity';
import { Repository } from 'typeorm';
import { CreateExerciseProgressZodDTO } from './dto/createExerciseProgressZod.dto';
import { UpdateExerciseProgressZodDTO } from './dto/updateExerciseZod.dto';

@Injectable()
export class ExerciseProgressService {
  constructor(
    @InjectRepository(ExerciseProgress)
    private exerciseProgressRepository: Repository<ExerciseProgress>,
  ) {}

  async findOne(id: number) {
    const progress = await this.exerciseProgressRepository.findOne({
      where: {
        id,
      },
      relations: ['progressions'],
    });

    if (!progress) throw new NotFoundException();

    return { progress };
  }

  async findAll() {
    const progress = await this.exerciseProgressRepository.find();

    if (!progress) throw new NotFoundException();

    return progress;
  }

  async create(dto: CreateExerciseProgressZodDTO) {
    return await this.exerciseProgressRepository.save(dto);
  }

  async update(id: number, dto: UpdateExerciseProgressZodDTO) {
    const progress = await this.exerciseProgressRepository.findOne({
      where: {
        id,
      },
    });

    if (!progress) throw new NotFoundException();

    await this.exerciseProgressRepository.update({ id }, dto);

    return this.exerciseProgressRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const progress = await this.exerciseProgressRepository.findOne({
      where: { id },
    });

    if (!progress) throw new NotFoundException('Progresso não encontrado');

    await this.exerciseProgressRepository.delete({ id });
  }
}
