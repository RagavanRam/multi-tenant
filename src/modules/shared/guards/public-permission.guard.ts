import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { DataSource, Repository } from 'typeorm';

import { ormConfig } from '../../../orm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../../public/users/user.entity';
import { RoleAndPermission } from '../../public/roles-and-permissions/role-and-permission.entity';

// noinspection DuplicatedCode
@Injectable()
export class PublicPermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>('permission', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request?.user;

    const usersRepository: Repository<User> = (
      await new DataSource({
        ...(ormConfig as PostgresConnectionOptions),
        name: 'public',
        schema: 'public',
      }).initialize()
    ).getRepository(User);

    const rolesAndPermissionsRepository: Repository<RoleAndPermission> = (
      await new DataSource({
        ...(ormConfig as PostgresConnectionOptions),
        name: 'public',
        schema: 'public',
      }).initialize()
    ).getRepository(RoleAndPermission);

    return usersRepository
      .findOne({ where: { id: user?.id }, relations: ['role'] })
      .then(async (res) => {
        if (res) {
          const user = res;
          if (!user.role) {
            return false;
          }
          const roleAndPermission = await rolesAndPermissionsRepository.findOne(
            {
              where: {
                role: {
                  name: user.role.name,
                },
                permission: { name: required[0] },
              },
            },
          );
          if (!roleAndPermission) {
            return false;
          }
          return (
            roleAndPermission[required[1]] === true ||
            roleAndPermission.manage == true
          );
        }
        return false;
      });
  }
}
