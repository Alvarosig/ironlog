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
  Req,
  UseGuards,
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/request-with-user';

@Controller('workout')
@UseGuards(JwtAuthGuard)
export class WorkoutController {
  constructor(private workoutsService: WorkoutService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createWorkoutSchema))
  async create(@Body() dto: CreateWorkoutZodDTO, @Req() req: RequestWithUser) {
    const userId = req.user.userId;
    const workout = await this.workoutsService.create(dto, userId);
    return workout;
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return await this.workoutsService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    const workout = await this.workoutsService.findOne(id, userId);
    return workout;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateWorkoutSchema)) dto: UpdateWorkoutZodDTO,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    const workout = await this.workoutsService.update(id, dto, userId);
    return workout;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    await this.workoutsService.delete(id, userId);
  }

  @Post(':workoutId/exercise/:exerciseId')
  async addExerciseToWorkout(
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    return await this.workoutsService.addExercise(
      workoutId,
      exerciseId,
      userId,
    );
  }

  @Delete(':workoutId/exercise/:exerciseId')
  @HttpCode(200)
  async removeExerciseFromWorkout(
    @Param('workoutId', ParseIntPipe) workoutId: number,
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    const res = await this.workoutsService.removeExercise(
      workoutId,
      exerciseId,
      userId,
    );
    return res;
  }
}
