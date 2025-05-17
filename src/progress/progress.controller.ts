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
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';
import { ProgressService } from './progress.service';
import {
  createProgressSchema,
  CreateProgressZodDTO,
} from './dto/createProgressZod.dto';
import {
  updateProgressSchema,
  UpdateProgressZodDTO,
} from './dto/updateProgressZod.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/request-with-user';

@Controller('exercise')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post(':exerciseId/progress')
  async create(
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Body(new ZodValidationPipe(createProgressSchema))
    dto: CreateProgressZodDTO,
    @Req()
    req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    const progress = await this.progressService.create(exerciseId, dto, userId);
    return progress;
  }

  @Get('progress/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const progress = await this.progressService.findOne(id);
    return progress;
  }

  @Put(':exerciseId/progress/:progressId')
  async update(
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Param('progressId', ParseIntPipe) progressId: number,
    @Body(new ZodValidationPipe(updateProgressSchema))
    dto: UpdateProgressZodDTO,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    const progress = await this.progressService.update(
      exerciseId,
      progressId,
      dto,
      userId,
    );
    return progress;
  }

  @Delete(':exerciseId/progress')
  @HttpCode(204)
  async deleteAll(
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    await this.progressService.deleteAll(exerciseId, userId);
  }

  @Delete(':exerciseId/progress/:progressId')
  @HttpCode(204)
  async deleteOne(
    @Param('exerciseId', ParseIntPipe) exerciseId: number,
    @Param('progressId', ParseIntPipe) progressId: number,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.userId;
    await this.progressService.deleteOne(exerciseId, progressId, userId);
  }
}
