import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateRoleAndPermissionDto {
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

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  roleId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  permissionId: number;
}
