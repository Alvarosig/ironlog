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
import { ProgressService } from './progress.service';
import {
  createProgressSchema,
  CreateProgressZodDTO,
} from './dto/createProgressZod.dto';
import {
  updateProgressSchema,
  UpdateProgressZodDTO,
} from './dto/updateProgressZod.dto';

@Controller('exercise/progress')
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProgressSchema))
  async create(@Body() dto: CreateProgressZodDTO) {
    const progress = await this.progressService.create(dto);
    return { progress };
  }

  @Get()
  async findAll() {
    return await this.progressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const progress = await this.progressService.findOne(id);
    return { progress };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateProgressSchema))
    dto: UpdateProgressZodDTO,
  ) {
    const progress = await this.progressService.update(id, dto);
    return { progress };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.progressService.delete(id);
  }
}
