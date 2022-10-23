import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleAndPermissionDto } from './dto/create-role-and-permission.dto';
import { UpdateRoleAndPermissionDto } from './dto/update-role-and-permission.dto';
import { RoleAndPermission } from './role-and-permission.entity';
import { Role } from '../roles/role.entity';
import { Permission } from '../permissions/permission.entity';

@Injectable()
export class RolesAndPermissionsService {
  constructor(
    @InjectRepository(RoleAndPermission)
    private rolesAndPermissionsRepository: Repository<RoleAndPermission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(
    createRolesAndPermissionDto: CreateRoleAndPermissionDto,
  ): Promise<RoleAndPermission> {
    const initRoleAndPermission = await this.initRoleAndPermission(
      createRolesAndPermissionDto.roleId,
      createRolesAndPermissionDto.permissionId,
    );
    return this.rolesAndPermissionsRepository.save({
      ...createRolesAndPermissionDto,
      ...initRoleAndPermission,
    });
  }

  async findAll(): Promise<RoleAndPermission[]> {
    return this.rolesAndPermissionsRepository.find();
  }

  async findOne(id: number): Promise<RoleAndPermission> {
    return await this.getRoleAndPermission(id);
  }

  async update(
    id: number,
    updateRolesAndPermissionDto: UpdateRoleAndPermissionDto,
  ): Promise<RoleAndPermission> {
    const roleAndPermission = await this.getRoleAndPermission(id);
    const changeCombination = await this.patchRoleAndPermission(
      updateRolesAndPermissionDto?.roleId,
      updateRolesAndPermissionDto?.permissionId,
      roleAndPermission.role,
      roleAndPermission.permission,
    );
    this.rolesAndPermissionsRepository.merge(
      roleAndPermission,
      updateRolesAndPermissionDto,
      changeCombination,
    );
    return this.rolesAndPermissionsRepository.save(roleAndPermission);
  }

  async remove(id: number): Promise<RoleAndPermission> {
    const roleAndPermission = await this.getRoleAndPermission(id);
    return this.rolesAndPermissionsRepository.remove(roleAndPermission);
  }

  async patchRoleAndPermission(
    roleId: number,
    permissionId: number,
    existRole: Role,
    existPermission: Permission,
  ): Promise<{ role: Role; permission: Permission }> {
    if (roleId && !permissionId) {
      const role = await this.getRole(roleId);
      if (await this.checkCombination(roleId, existPermission.id))
        throw new BadRequestException();
      return { role, permission: existPermission };
    } else if (permissionId && roleId) {
      const permission = await this.getPermission(permissionId);
      if (await this.checkCombination(existRole.id, permissionId))
        throw new BadRequestException();
      return { role: existRole, permission };
    } else if (roleId && permissionId) {
      return await this.initRoleAndPermission(roleId, permissionId);
    } else {
      return { role: existRole, permission: existPermission };
    }
  }

  async initRoleAndPermission(
    roleId: number,
    permissionId: number,
  ): Promise<{ role: Role; permission: Permission }> {
    const role = await this.getRole(roleId);
    const permission = await this.getPermission(permissionId);
    if (await this.checkCombination(roleId, permissionId))
      throw new BadRequestException();
    return { role, permission };
  }

  async checkCombination(
    roleId: number,
    permissionId: number,
  ): Promise<boolean> {
    const combination = await this.rolesAndPermissionsRepository.findOne({
      where: {
        role: { id: roleId },
        permission: { id: permissionId },
      },
    });
    return !!combination;
  }

  async getRole(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) throw new NotFoundException('role not found');
    return role;
  }

  async getPermission(permissionId: number): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });
    if (!permission) throw new NotFoundException('permission not found');
    return permission;
  }

  async getRoleAndPermission(
    roleAndPermissionId: number,
  ): Promise<RoleAndPermission> {
    const roleAndPermission = await this.rolesAndPermissionsRepository.findOne({
      where: { id: roleAndPermissionId },
    });
    if (!roleAndPermission) throw new NotFoundException();
    return roleAndPermission;
  }
}
