import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { PublicUnique } from '../../../shared/decorators/public-unique.decorator';
import { Permission } from '../permission.entity';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @PublicUnique([
    Permission,
    {
      select: 'Permission.id',
      where: 'Permission.name = :name',
      parameters: { name: 'value' },
    },
  ])
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
