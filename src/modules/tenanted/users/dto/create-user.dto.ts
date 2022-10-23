import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { TenantUnique } from '../../../shared/decorators/tenant-unique.decorator';
import { User } from '../user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @TenantUnique(
    [
      User,
      {
        select: 'User.id',
        where: 'User.username = :username',
        parameters: { username: 'value' },
      },
    ],
    { message: 'Username Already Exist.' },
  )
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @TenantUnique(
    [
      User,
      {
        select: 'User.id',
        where: 'User.email = :email',
        parameters: { email: 'value' },
      },
    ],
    { message: 'Email Already Exist.' },
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
