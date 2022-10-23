import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PublicUnique } from '../../../shared/decorators/public-unique.decorator';
import { Role } from '../role.entity';

export class UpdateRoleDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @PublicUnique(
    [
      Role,
      {
        select: 'Role.id',
        where: 'Role.name = :name and id != :roleId',
        parameters: { name: 'value', roleId: 'params.id' },
      },
    ],
    { message: 'role name already exist.' },
  )
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
