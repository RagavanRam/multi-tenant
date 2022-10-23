import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { TenancyModule } from '../../tenancy/tenancy.module';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity]), TenancyModule],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
