import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';
import { ExerciseProgressService } from './exercise-progress.service';
import {
  createExerciseProgressSchema,
  CreateExerciseProgressZodDTO,
} from './dto/createExerciseProgressZod.dto';
import {
  updateExerciseProgressSchema,
  UpdateExerciseProgressZodDTO,
} from './dto/updateExerciseZod.dto';

@Controller('exercise-progress')
export class ExerciseProgressController {
  constructor(private exerciseProgressService: ExerciseProgressService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createExerciseProgressSchema))
  async create(@Body() dto: CreateExerciseProgressZodDTO) {
    const progress = await this.exerciseProgressService.create(dto);
    return { progress };
  }

  @Get()
  async findAll() {
    return await this.exerciseProgressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const progress = await this.exerciseProgressService.findOne(id);
    return { progress };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateExerciseProgressSchema))
    dto: UpdateExerciseProgressZodDTO,
  ) {
    const progress = await this.exerciseProgressService.update(id, dto);
    return { progress };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.exerciseProgressService.delete(id);
  }
}
