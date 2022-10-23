import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { PublicUnique } from '../../../shared/decorators/public-unique.decorator';
import { Role } from '../role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @PublicUnique(
    [
      Role,
      {
        select: 'Role.id',
        where: 'Role.name = :name',
        parameters: { name: 'value' },
      },
    ],
    { message: 'role name already exist.' },
  )
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
