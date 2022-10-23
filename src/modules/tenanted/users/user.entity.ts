import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'tenant-users' })
export class User extends AbstractEntity {
  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;
}
