import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../roles/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const role = await this.getRole(createUserDto.roleId);
    const hash = await bcrypt.hash(createUserDto.password, 12);
    return this.userRepository.save({ ...createUserDto, password: hash, role });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['role'] });
  }

  async findOne(id: string): Promise<User> {
    return await this.getUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUser(id);
    let role: Role = user.role;
    if (updateUserDto.roleId) role = await this.getRole(updateUserDto.roleId);
    this.userRepository.merge(user, updateUserDto, { role });
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.getUser(id);
    return this.userRepository.remove(user);
  }

  async getRole(roleId: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { id: roleId } });
  }

  async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['role', 'role.permissions'],
    });
    if (!user)
      throw new NotFoundException(`user not found with an id of ${userId}`);
    return user;
  }
}
