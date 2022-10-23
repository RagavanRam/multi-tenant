import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import { SnakeNamingStrategy } from './snake-naming.strategy';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'test',
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: true,
  synchronize: true,
  entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
};
