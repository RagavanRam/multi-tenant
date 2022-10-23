import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { PublicUnique } from '../../../shared/decorators/public-unique.decorator';
import { Permission } from '../permission.entity';

export class UpdatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @PublicUnique([
    Permission,
    {
      select: 'Permission.id',
      where: 'Permission.name = :name and id != :permissionId',
      parameters: { name: 'value', permissionId: 'params.id' },
    },
  ])
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
