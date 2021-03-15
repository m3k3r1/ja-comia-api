import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorator/get-user.decorator';
import CreateUserDTO from '../dtos/create-task.dto';
import User from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  public getAll(@GetUser() user: User): Promise<User[]> {
    console.log(user);
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
