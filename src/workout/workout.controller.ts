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
import {
  createWorkoutSchema,
  CreateWorkoutZodDTO,
} from './dto/createWorkoutZod.dto';
import {
  updateWorkoutSchema,
  UpdateWorkoutZodDTO,
} from './dto/updateWorkoutZod.dto';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutsService: WorkoutService) {}

  // @Post()
  // @UsePipes(new ZodValidationPipe(createWorkoutSchema))
  // async create(@Body() dto: CreateWorkoutZodDTO) {
  //   const workout = await this.workoutsService.create(dto);
  //   return { workout };
  // }

  @Get()
  async findAll() {
    return await this.workoutsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const workout = await this.workoutsService.findOne(id);
    return { workout };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWorkoutSchema)) dto: UpdateWorkoutZodDTO,
  ) {
    const workout = await this.workoutsService.update(id, dto);
    return { workout };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.workoutsService.delete(id);
  }
}
