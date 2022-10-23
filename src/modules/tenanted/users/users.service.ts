import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CONNECTION } from '../../tenancy/tenancy.symbols';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly userRepository: Repository<User>;

  constructor(@Inject(CONNECTION) connection: DataSource) {
    try {
      this.userRepository = connection.getRepository(User);
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 12);
    return this.userRepository.save({ ...createUserDto, password: hash });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return this.userRepository.remove(user);
  }
}
