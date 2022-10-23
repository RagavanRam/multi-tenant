import { Module } from '@nestjs/common';

import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesAndPermissionsModule } from './roles-and-permissions/roles-and-permissions.module';

@Module({
  imports: [
    TenantsModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    RolesAndPermissionsModule,
  ],
})
export class PublicModule {}
