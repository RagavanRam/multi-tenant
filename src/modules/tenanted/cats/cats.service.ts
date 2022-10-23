import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CatEntity } from './cat.entity';
import { CONNECTION } from '../../tenancy/tenancy.symbols';
import { CreateCatDto } from './dto';

@Injectable()
export class CatsService {
  private readonly catsRepository: Repository<CatEntity>;

  constructor(@Inject(CONNECTION) private connection: DataSource) {
    this.catsRepository = connection.getRepository(CatEntity);
  }

  create(createCatDto: CreateCatDto): Promise<CatEntity> {
    const cat = new CatEntity();
    cat.name = createCatDto.name;

    return this.catsRepository.save(cat);
  }

  async findAll(): Promise<CatEntity[]> {
    return this.catsRepository.find();
  }
}
