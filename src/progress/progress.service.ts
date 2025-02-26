import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from 'src/entities/progress.entity';
import { Repository } from 'typeorm';
import { CreateProgressZodDTO } from './dto/createProgressZod.dto';
import { UpdateProgressZodDTO } from './dto/updateProgressZod.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async findOne(id: number) {
    const progress = await this.progressRepository.findOne({
      where: {
        id,
      },
      relations: ['progressions'],
    });

    if (!progress) throw new NotFoundException();

    return { progress };
  }

  async findAll() {
    const progress = await this.progressRepository.find();

    if (!progress) throw new NotFoundException();

    return progress;
  }

  async create(dto: CreateProgressZodDTO) {
    return await this.progressRepository.save(dto);
  }

  async update(id: number, dto: UpdateProgressZodDTO) {
    const progress = await this.progressRepository.findOne({
      where: {
        id,
      },
    });

    if (!progress) throw new NotFoundException();

    await this.progressRepository.update({ id }, dto);

    return this.progressRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const progress = await this.progressRepository.findOne({
      where: { id },
    });

    if (!progress) throw new NotFoundException('Progresso não encontrado');

    await this.progressRepository.delete({ id });
  }
}
