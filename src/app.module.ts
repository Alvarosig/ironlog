import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from 'dbConfig';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(pgConfig), ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
