import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import User from 'src/users/entities/user.entity';
import { UserStore } from 'src/users/store/user.store';
import { GetUserByIdQuery } from '../get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandlerQuery
  implements IQueryHandler<GetUserByIdQuery> {
  public constructor(private readonly userStore: UserStore) {}

  public async execute(query: GetUserByIdQuery): Promise<User> {
    const { id } = query;
    const user = await this.userStore.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
