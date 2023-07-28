// src/users/users.controller.ts

import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.createUser(userData);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') userID: number): Promise<User> {
    const user = await this.usersService.getUserById(userID);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') userID: number, @Body() userData: Partial<User>): Promise<User> {
    return this.usersService.updateUser(userID, userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userID: number): Promise<void> {
    return this.usersService.deleteUser(userID);
  }
}
