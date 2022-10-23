import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '../../../abstract.entity';

@Entity({ name: 'tenants' })
export class Tenant extends AbstractEntity {
  @Column()
  name: string;
}
