import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from 'src/entities/workout.entity';
import { Repository } from 'typeorm';
import { CreateWorkoutZodDTO } from './dto/createWorkoutZod.dto';
import { UpdateWorkoutZodDTO } from './dto/updateWorkoutZod.dto';
import { User } from 'src/entities/user.entity';
import { Exercise } from 'src/entities/exercise.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}

  async findOne(id: number) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id,
      },
      relations: ['exercises'],
    });

    if (!workout) throw new NotFoundException();

    return workout;
  }

  async findAll() {
    const workouts = await this.workoutRepository.find({
      relations: ['exercises'],
    });

    if (!workouts || workouts.length === 0) throw new NotFoundException();

    return workouts;
  }

  // async create(dto: CreateWorkoutZodDTO, userId: number, exerciseId: number) {
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) throw new NotFoundException('Usuário não encontrado.');

  //   const exercises = await this.exerciseRepository.findBy({
  //     id: In(exerciseId),
  //   });
  //   if (exercises.length !== exerciseIds.length)
  //     throw new NotFoundException('Um ou mais exercícios não encontrados.');

  //   return await this.workoutRepository.save(dto);
  // }

  async update(id: number, dto: UpdateWorkoutZodDTO) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id,
      },
    });

    if (!workout) throw new NotFoundException();

    await this.workoutRepository.update({ id }, dto);

    return this.workoutRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id,
      },
    });

    if (!workout) throw new NotFoundException();

    await this.workoutRepository.delete({ id });
  }
}
