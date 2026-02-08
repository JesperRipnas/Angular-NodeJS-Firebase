import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthUser } from '../auth/interfaces/auth-user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers(): AuthUser[] {
    return this.usersService.getUsers();
  }

  // NEEDS TO CHECK FOR AUTHORIZATION BOTH IN CLIENT & SERVER
  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('uuid') uuid: string): AuthUser {
    const user = this.usersService.getUserById(uuid);
    if (!user) {
      throw new NotFoundException(`User with id "${uuid}" not found`);
    }
    return user;
  }

  @Put(':uuid')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Param('uuid') uuid: string,
    @Body() updateData: Partial<AuthUser>,
  ): AuthUser {
    if (!uuid) {
      throw new BadRequestException('User id is required');
    }

    const updatedUser = this.usersService.updateUser(uuid, updateData);
    if (!updatedUser) {
      throw new NotFoundException(`User with id "${uuid}" not found`);
    }
    return updatedUser;
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('uuid') uuid: string): void {
    if (!uuid) {
      throw new BadRequestException('User id is required');
    }

    const deleted = this.usersService.deleteUser(uuid);
    if (!deleted) {
      throw new NotFoundException(`User with id "${uuid}" not found`);
    }
  }
}
