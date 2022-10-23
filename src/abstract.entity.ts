import {
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Exclude()
export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  private async beforeUpdate() {
    this.updatedAt = new Date();
  }
}
