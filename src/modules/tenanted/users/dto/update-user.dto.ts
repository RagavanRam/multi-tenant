import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from '../user.entity';
import { TenantUnique } from '../../../shared/decorators/tenant-unique.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @TenantUnique(
    [
      User,
      {
        select: 'User.id',
        where: 'User.username = :username and id != :userId',
        parameters: { username: 'value', userId: 'params.id' },
      },
    ],
    { message: 'Username Already Exist.' },
  )
  username: string;

  @Exclude()
  email: string;

  @Exclude()
  password: string;
}
