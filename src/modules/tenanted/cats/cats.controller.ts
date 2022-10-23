import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto';
import { CatEntity } from './cat.entity';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<CatEntity[]> {
    return this.catsService.findAll();
  }
}
