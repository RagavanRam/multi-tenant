import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../../shared/guards/local-auth.guard';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { PublicPermissionGuard } from '../../shared/guards/public-permission.guard';
import { Permission } from '../../shared/decorators/permission.decorator';

@Controller('public/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('signUp')
  signUpLocal(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signInLocal(@Request() request: any): Promise<any> {
    return await this.authService.signIn(request.user);
  }

  @Permission(['users', 'read'])
  @UseGuards(JwtAuthGuard, PublicPermissionGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
