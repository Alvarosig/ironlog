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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/request-with-user';

@Controller('exercise')
@UseGuards(JwtAuthGuard)
export class ExerciseController {
  constructor(private exerciseService: ExerciseService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createExerciseSchema))
  async create(@Body() dto: CreateExerciseZodDTO, @Req() req: RequestWithUser) {
    const userId = req.user.userId;
    const exercise = await this.exerciseService.create(dto, userId);
    return exercise;
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return await this.exerciseService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    const exercise = await this.exerciseService.findOne(id, userId);
    return exercise;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateExerciseSchema))
    dto: UpdateExerciseZodDTO,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    const exercise = await this.exerciseService.update(id, dto, userId);
    return exercise;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    await this.exerciseService.delete(id, userId);
  }
}
