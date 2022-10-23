import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../base.entity';
import { RoleAndPermission } from '../roles-and-permissions/role-and-permission.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'public-roles' })
export class Role extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

  @OneToMany(
    () => RoleAndPermission,
    (roleAndPermission) => roleAndPermission.role,
  )
  permissions: RoleAndPermission[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
