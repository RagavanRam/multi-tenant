import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntitySchema, ObjectType } from 'typeorm';
import { TenantUniqueConstraint } from '../constraints/tenant-unique.constraint';

type UniqueConstraintInterface<E> = [
  ObjectType<E> | EntitySchema<E> | string,
  {
    select: string;
    where: string;
    parameters: Record<string, string>;
  },
];

export function TenantUnique<E>(
  property: UniqueConstraintInterface<E>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: property,
      options: validationOptions,
      validator: TenantUniqueConstraint,
    });
  };
}
