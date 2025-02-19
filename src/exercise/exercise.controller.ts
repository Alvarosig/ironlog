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
import { ExerciseService } from './exercise.service';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';
import {
  createExerciseSchema,
  CreateExerciseZodDTO,
} from './dto/createExerciseZod.dto';
import {
  updateExerciseSchema,
  UpdateExerciseZodDTO,
} from './dto/updateExerciseZod.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createExerciseSchema))
  async create(@Body() dto: CreateExerciseZodDTO) {
    const exercise = await this.exerciseService.create(dto);
    return { exercise };
  }

  @Get()
  async findAll() {
    return await this.exerciseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const exercise = await this.exerciseService.findOne(id);
    return { exercise };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateExerciseSchema))
    dto: UpdateExerciseZodDTO,
  ) {
    const exercise = await this.exerciseService.update(id, dto);
    return { exercise };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.exerciseService.delete(id);
  }
}
