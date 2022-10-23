import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesAndPermissionsService } from './roles-and-permissions.service';
import { RolesAndPermissionsController } from './roles-and-permissions.controller';
import { RoleAndPermission } from './role-and-permission.entity';
import { Role } from '../roles/role.entity';
import { Permission } from '../permissions/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleAndPermission, Role, Permission])],
  controllers: [RolesAndPermissionsController],
  providers: [RolesAndPermissionsService],
})
export class RolesAndPermissionsModule {}
