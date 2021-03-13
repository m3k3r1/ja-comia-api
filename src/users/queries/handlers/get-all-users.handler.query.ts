import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../get-all-users.query';
import { UserStore } from 'src/users/store/user.store';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandlerQuery
  implements IQueryHandler<GetAllUsersQuery> {
  public constructor(private readonly userStore: UserStore) {}

  public async execute(query: GetAllUsersQuery) {
    return await this.userStore.findAll();
  }
}
