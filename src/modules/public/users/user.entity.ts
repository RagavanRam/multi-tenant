import { Column, Entity, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../../abstract.entity';
import { Role } from '../roles/role.entity';

@Entity({ name: 'public-users' })
export class User extends AbstractEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
