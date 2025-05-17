import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Progress } from 'src/entities/progress.entity';
import { Repository } from 'typeorm';
import { CreateProgressZodDTO } from './dto/createProgressZod.dto';
import { UpdateProgressZodDTO } from './dto/updateProgressZod.dto';
import { Exercise } from 'src/entities/exercise.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,

    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async create(exerciseId: number, dto: CreateProgressZodDTO, userId: number) {
    const exercise = await this.exerciseRepository.findOne({
      where: {
        id: exerciseId,
        user: {
          id: userId,
        },
      },
    });

    if (!exercise) {
      throw new NotFoundException('Exercício não encontrado');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const progress = await this.progressRepository.save({
      ...dto,
      exercise,
      user,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user: _, ...progressWithoutUser } = progress;

    return progressWithoutUser;
  }

  async update(
    exerciseId: number,
    progressId: number,
    dto: UpdateProgressZodDTO,
    userId: number,
  ) {
    const exercise = await this.exerciseRepository.findOne({
      where: {
        id: exerciseId,
        user: { id: userId },
      },
    });

    if (!exercise) {
      throw new NotFoundException(
        'Exercício não encontrado ou não pertence ao usuário',
      );
    }

    const progress = await this.progressRepository.findOne({
      where: { id: progressId, exercise: { id: exerciseId } },
    });

    if (!progress) {
      throw new NotFoundException('Progresso não encontrado');
    }

    await this.progressRepository.update({ id: progressId }, dto);

    const updatedProgress = await this.progressRepository.findOne({
      where: {
        id: progressId,
        user: {
          id: userId,
        },
      },
      relations: ['exercise'],
      select: ['id', 'reps', 'weight', 'date'],
    });

    if (!updatedProgress) {
      throw new NotFoundException('Progresso não encontrado após atualização');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, ...progressWithoutUser } = updatedProgress;

    return progressWithoutUser;
  }

  async deleteAll(exerciseId: number, userId: number) {
    const progressList = await this.progressRepository.find({
      where: {
        exercise: {
          id: exerciseId,
        },
        user: {
          id: userId,
        },
      },
    });

    if (!progressList.length) {
      throw new NotFoundException('Progresso não encontrado');
    }

    const progressIds = progressList.map((progress) => progress.id);

    await this.progressRepository.delete(progressIds);
  }

  async deleteOne(exerciseId: number, progressId: number, userId: number) {
    const progress = await this.progressRepository.findOne({
      where: {
        id: progressId,
        exercise: { id: exerciseId },
        user: { id: userId },
      },
    });

    if (!progress) {
      throw new NotFoundException('Progresso não encontrado');
    }

    await this.progressRepository.delete({ id: progressId });
  }
}
