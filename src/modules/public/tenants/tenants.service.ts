import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreateTenantDto } from './dto';
import { Tenant } from './tenant.entity';
import { getTenantConnection } from '../../tenancy/tenancy.utils';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let tenant = new Tenant();
    tenant.name = createTenantDto.name;

    tenant = await this.tenantsRepository.save(tenant);

    const schemaName = `tenant_${tenant.id}`;
    await this.entityManager.query(
      `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
    );

    const connection = await getTenantConnection(tenant.id);
    await connection.destroy();

    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }

  async remove(id: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { id } });

    if (!tenant) {
      throw new NotFoundException(`Not Found Tenant with an id of ${id}`);
    }
    const schemaName = `tenant_${tenant.id}`;
    await this.entityManager.query(
      `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`,
    );

    return this.tenantsRepository.remove(tenant);
  }
}
