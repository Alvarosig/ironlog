import { Exercise } from '../entities/exercise.entity';
import { Progress } from '../entities/progress.entity';
import { User } from '../entities/user.entity';
import { Workout } from '../entities/workout.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const workoutRepository = dataSource.getRepository(Workout);
    const exerciseRepository = dataSource.getRepository(Exercise);
    const exerciseProgressRepository = dataSource.getRepository(Progress);

    // Buscar usuários existentes ou criar novos
    let users = await userRepository.find();
    if (users.length === 0) {
      users = await factoryManager.get(User).saveMany(5); // Cria 5 usuários
    }

    // Criar Exercícios e associar a Usuários corretamente
    const exercises: Exercise[] = [];
    for (let i = 0; i < 15; i++) {
      const exercise = await factoryManager.get(Exercise).make();
      exercise.user = users[Math.floor(Math.random() * users.length)]; // Associa cada exercício a um usuário aleatório
      exercises.push(exercise);
    }
    await exerciseRepository.save(exercises);

    // Criar Workouts e associar a Usuários
    const workouts: Workout[] = [];
    for (let i = 0; i < 10; i++) {
      const workout = await factoryManager.get(Workout).make();
      workout.user = users[Math.floor(Math.random() * users.length)];
      workouts.push(workout);
    }
    await workoutRepository.save(workouts);

    // Associar exercícios aos Workouts
    for (const workout of workouts) {
      workout.exercises = exercises.sort(() => 0.5 - Math.random()).slice(0, 5); // Pega 5 exercícios aleatórios por workout
      await workoutRepository.save(workout);
    }

    // Criar registros de progresso (ExerciseProgress) corretamente
    const progressRecords: Progress[] = [];
    for (const exercise of exercises) {
      const numRecords = Math.floor(Math.random() * 4) + 1; // Criar entre 1 e 4 registros por exercício
      for (let i = 0; i < numRecords; i++) {
        const progress = await factoryManager.get(Progress).make();
        progress.exercise = exercise;
        progress.user = exercise.user; // O progresso agora pertence ao usuário do exercício
        progressRecords.push(progress);
      }
    }

    // Salvar os registros de progresso
    await exerciseProgressRepository.save(progressRecords);

    console.log('Seeders executados com sucesso! 🚀');
  }
}
