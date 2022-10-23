import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../base.entity';
import { Role } from '../roles/role.entity';
import { Permission } from '../permissions/permission.entity';

@Entity({ name: 'public-roles-and-permissions' })
export class RoleAndPermission extends BaseEntity {
  @Column({ type: 'boolean', default: false, nullable: false })
  manage: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  create: boolean;

  @Column({ type: 'boolean', default: true, nullable: false })
  read: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  update: boolean;

  @Column({ type: 'boolean', default: false, nullable: false })
  delete: boolean;

  @ManyToOne(() => Role, (role) => role.permissions, { nullable: false })
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.roles, {
    nullable: false,
  })
  permission: Permission;
}
