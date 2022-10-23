import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { User } from '../user.entity';
import { PublicUnique } from '../../../shared/decorators/public-unique.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @PublicUnique(
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
  @PublicUnique(
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

  @IsOptional()
  @IsNumber()
  roleId: number;
}
