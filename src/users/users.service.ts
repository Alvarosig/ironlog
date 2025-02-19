import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserZodDTO } from './dto/createUserZod.dto';
import { UpdateUserZodDTO } from './dto/updateUserZod.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (!users) throw new NotFoundException();

    return users;
  }

  async create(dto: CreateUserZodDTO) {
    return await this.userRepository.save(dto);
  }

  async update(id: number, dto: UpdateUserZodDTO) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();

    const updateData = {
      ...dto,
      update_date: new Date(),
    };

    await this.userRepository.update({ id }, updateData);

    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException();

    await this.userRepository.delete({ id });
  }
}
