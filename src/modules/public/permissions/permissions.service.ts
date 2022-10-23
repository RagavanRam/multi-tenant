import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionRepository.save(createPermissionDto);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findOne(id: number): Promise<Permission> {
    return await this.getPermission(id);
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = await this.getPermission(id);
    this.permissionRepository.merge(permission, updatePermissionDto);
    return this.permissionRepository.save(permission);
  }

  async remove(id: number): Promise<Permission> {
    const permission = await this.getPermission(id);
    return this.permissionRepository.remove(permission);
  }

  async getPermission(permissionId: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });
    if (!permission) throw new NotFoundException();
    return permission;
  }
}
