import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/entities/workout.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutZodDTO } from './dto/createWorkoutZod.dto';
import { UpdateWorkoutZodDTO } from './dto/updateWorkoutZod.dto';
import { Exercise } from 'src/entities/exercise.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async findOne(id: number, userId: number) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
      relations: ['exercises'],
    });

    teste;

    if (!workout) throw new NotFoundException();

    return workout;
  }

  async findAll(userId: number) {
    const workouts = await this.workoutRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['exercises'],
    });

    if (!workouts || workouts.length === 0) throw new NotFoundException();

    return workouts;
  }

  async create(dto: CreateWorkoutZodDTO, userId: number) {
    const workout = this.workoutRepository.create({
      ...dto,
      user: { id: userId },
    });

    return await this.workoutRepository.save(workout);
  }

  async update(id: number, dto: UpdateWorkoutZodDTO, userId: number) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!workout) throw new NotFoundException();

    await this.workoutRepository.update({ id }, dto);

    return this.workoutRepository.findOne({ where: { id } });
  }

  async delete(id: number, userId: number) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!workout) throw new NotFoundException();

    await this.workoutRepository.delete({ id });
  }

  async addExercise(workoutId: number, exerciseId: number, userId: number) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id: workoutId,
        user: {
          id: userId,
        },
      },
      relations: ['exercises'],
    });

    if (!workout) {
      throw new NotFoundException(
        'Workout não encontrado ou não pertence ao usuário',
      );
    }

    const exercise = await this.exerciseRepository.findOne({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException('Exercício não encontrado');
    }

    if (workout.exercises.some((ex) => ex.id === exercise.id)) {
      throw new BadRequestException(
        'Este exercício já está vinculado a este workout',
      );
    }

    workout.exercises.push(exercise);
    await this.workoutRepository.save(workout);

    return workout;
  }

  async removeExercise(workoutId: number, exerciseId: number, userId: number) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id: workoutId,
        user: { id: userId },
      },
      relations: ['exercises'],
    });

    if (!workout) {
      throw new NotFoundException(
        'Workout não encontrado ou não pertence ao usuário',
      );
    }

    const exerciseIndex = workout.exercises.findIndex(
      (ex) => ex.id === exerciseId,
    );

    if (exerciseIndex === -1) {
      throw new BadRequestException(
        'Exercício não está vinculado a este workout',
      );
    }

    workout.exercises.splice(exerciseIndex, 1);

    await this.workoutRepository.save(workout);

    return { message: 'Exercício removido do workout com sucesso' };
  }
}
