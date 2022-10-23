import { Inject, Injectable } from '@nestjs/common';
import { each, at } from 'lodash';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ValidatorsService } from '../services/validators.service';
import { tenantOrmConfig } from '../../../tenant-orm.config';

@ValidatorConstraint({ name: 'tenant-unique', async: true })
@Injectable()
export class TenantUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(ValidatorsService) private validatorsService: ValidatorsService,
  ) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [entityClass, queryConditions] = args.constraints;
    const parameters = { value, params: this.validatorsService.getParams() };
    const schemaName = `tenant_${this.validatorsService.schemaId}`;

    const queryBuilder = (
      await new DataSource({
        ...(tenantOrmConfig as PostgresConnectionOptions),
        name: schemaName,
        schema: schemaName,
      }).initialize()
    )
      .getRepository(entityClass)
      .createQueryBuilder();

    const parameterQuery = {};
    each(queryConditions.parameters, (val, property) => {
      const find = at(parameters, val);
      parameterQuery[property] = find[0];
    });

    const entity = await queryBuilder
      .select(queryConditions.select)
      .where(queryConditions.where)
      .setParameters(parameterQuery)
      .getOne();

    return !entity;
  }
}
