import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateUserDTO from '../dtos/create-task.dto';
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

  @Post()
  @UsePipes(ValidationPipe)
  public create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.create(createUserDTO);
  }

  @Delete(':id')
  public delete(): Promise<void> {
    return this.usersService.delete();
  }
}
