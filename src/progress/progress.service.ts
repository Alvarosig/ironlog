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
      select: ['id', 'reps', 'weight', 'date'],
    });

    if (!progress) throw new NotFoundException();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...progressWithoutUser } = progress;

    return progressWithoutUser;
  }

  async findAll() {
    const progress = await this.progressRepository.find();

    if (progress.length === 0) throw new NotFoundException();

    const progressWithoutUser = progress.map((progress) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...progressWithoutUser } = progress;
      return progressWithoutUser;
    });

    return progressWithoutUser;
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
