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
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';
import { createUserSchema, CreateUserZodDTO } from './dto/createUserZod.dto';
import { updateUserSchema, UpdateUserZodDTO } from './dto/updateUserZod.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() dto: CreateUserZodDTO) {
    const user = await this.usersService.create(dto);
    return { user };
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return { user };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema)) dto: UpdateUserZodDTO,
  ) {
    const user = await this.usersService.update(id, dto);
    return { user };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.delete(id);
  }
}
