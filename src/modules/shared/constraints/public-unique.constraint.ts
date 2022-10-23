import { Inject, Injectable } from '@nestjs/common';
import { each, at } from 'lodash';

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import { ormConfig } from '../../../orm.config';
import { ValidatorsService } from '../services/validators.service';

@ValidatorConstraint({ name: 'public-unique', async: true })
@Injectable()
export class PublicUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(ValidatorsService) private validatorsService: ValidatorsService,
  ) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [entityClass, queryConditions] = args.constraints;
    const parameters = { value, params: this.validatorsService.getParams() };

    const queryBuilder = (
      await new DataSource({
        ...(ormConfig as PostgresConnectionOptions),
        name: 'public',
        schema: 'public',
      }).initialize()
    )
      .getRepository(entityClass)
      .createQueryBuilder();

    await queryBuilder
      .select(queryConditions.select)
      .where(queryConditions.where);

    const parameterQuery = {};
    each(queryConditions.parameters, (val, property) => {
      const find = at(parameters, val);
      parameterQuery[property] = find[0];
    });

    const entity = await queryBuilder.setParameters(parameterQuery).getOne();

    return !entity;
  }
}
