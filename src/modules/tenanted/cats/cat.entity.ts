import { BaseEntity } from '../../../base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'cats' })
export class CatEntity extends BaseEntity {
  @Column()
  name: string;
}
