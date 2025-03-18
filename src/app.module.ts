import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutModule } from './workout/workout.module';
import { ProgressModule } from './progress/progress.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Acessar env em qualquer modulo
    }),
    TypeOrmModule.forRoot(pgConfig),
    AuthModule,
    UsersModule,
    ProgressModule,
    ExerciseModule,
    WorkoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
