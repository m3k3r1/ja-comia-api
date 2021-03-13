import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
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
  public getById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getById(id);
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
