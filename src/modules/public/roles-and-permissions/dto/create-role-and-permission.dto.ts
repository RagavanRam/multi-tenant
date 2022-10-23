import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRoleAndPermissionDto {
  @IsOptional()
  @IsBoolean()
  manage: boolean;

  @IsOptional()
  @IsBoolean()
  create: boolean;

  @IsOptional()
  @IsBoolean()
  read: boolean;

  @IsOptional()
  @IsBoolean()
  update: boolean;

  @IsOptional()
  @IsBoolean()
  delete: boolean;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsNotEmpty()
  @IsNumber()
  permissionId: number;
}
