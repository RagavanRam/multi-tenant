import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { User } from '../user.entity';
import { PublicUnique } from '../../../shared/decorators/public-unique.decorator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @PublicUnique(
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

  @IsOptional()
  @IsNumber()
  roleId: number;
}
