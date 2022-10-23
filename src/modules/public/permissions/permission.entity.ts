import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../base.entity';
import { RoleAndPermission } from '../roles-and-permissions/role-and-permission.entity';

@Entity({ name: 'public-permissions' })
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @OneToMany(
    () => RoleAndPermission,
    (roleAndPermission) => roleAndPermission.permission,
  )
  roles: RoleAndPermission[];
}
