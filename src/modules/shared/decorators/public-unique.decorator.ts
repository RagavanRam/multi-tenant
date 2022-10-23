import { registerDecorator, ValidationOptions } from 'class-validator';

import { PublicUniqueConstraint } from '../constraints/public-unique.constraint';
import { EntitySchema, ObjectType } from 'typeorm';

type UniqueConstraintInterface<E> = [
  ObjectType<E> | EntitySchema<E> | string,
  {
    select: string;
    where: string;
    parameters: Record<string, string>;
  },
];

export function PublicUnique<E>(
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
      validator: PublicUniqueConstraint,
    });
  };
}
