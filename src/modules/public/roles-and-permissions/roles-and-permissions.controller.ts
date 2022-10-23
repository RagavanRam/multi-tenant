import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { RolesAndPermissionsService } from './roles-and-permissions.service';
import { CreateRoleAndPermissionDto } from './dto/create-role-and-permission.dto';
import { UpdateRoleAndPermissionDto } from './dto/update-role-and-permission.dto';

@Controller('public/roles-and-permissions')
export class RolesAndPermissionsController {
  constructor(
    private readonly rolesAndPermissionsService: RolesAndPermissionsService,
  ) {}

  @Post()
  create(@Body() createRolesAndPermissionDto: CreateRoleAndPermissionDto) {
    return this.rolesAndPermissionsService.create(createRolesAndPermissionDto);
  }

  @Get()
  findAll() {
    return this.rolesAndPermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesAndPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRolesAndPermissionDto: UpdateRoleAndPermissionDto,
  ) {
    return this.rolesAndPermissionsService.update(
      +id,
      updateRolesAndPermissionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesAndPermissionsService.remove(+id);
  }
}
