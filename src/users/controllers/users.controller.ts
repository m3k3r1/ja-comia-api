import { Controller, Delete, Get, Post } from '@nestjs/common';
import User from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  public getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  public getById(): Promise<User> {
    return this.usersService.getById();
  }

  @Post('')
  public create(): Promise<User> {
    return this.usersService.create();
  }

  @Delete(':id')
  public delete(): Promise<void> {
    return this.usersService.delete();
  }
}
