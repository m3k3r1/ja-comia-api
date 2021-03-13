import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import User from '../entities/user.entity';
import { GetAllUsersQuery } from '../queries/get-all-users.query';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import CreateUserDTO from '../dtos/create-task.dto';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable()
export class UsersService {
  public constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  public async getAll(): Promise<User[]> {
    return this.queryBus.execute(new GetAllUsersQuery());
  }
  public async getById(id: string): Promise<User> {
    return this.queryBus.execute(new GetUserByIdQuery(id));
  }
  public async create(createUserDTO: CreateUserDTO): Promise<User> {
    return this.commandBus.execute(new CreateUserCommand(createUserDTO));
  }
  public async delete(): Promise<void> {
    return null;
  }
}
