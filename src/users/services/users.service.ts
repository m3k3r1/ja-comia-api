import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import User from '../entities/user.entity';
import { GetAllUsersQuery } from '../queries/get-all-users.query';

@Injectable()
export class UsersService {
  public constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  public async getAll(): Promise<User[]> {
    return this.queryBus.execute(new GetAllUsersQuery());
  }
  public async getById(): Promise<User | undefined> {
    return null;
  }
  public async create(): Promise<User> {
    return null;
  }
  public async delete(): Promise<void> {
    return null;
  }
}
