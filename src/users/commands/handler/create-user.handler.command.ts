import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserAggregate } from 'src/users/aggregates/user.aggregate';
import { UserStore } from 'src/users/store/user.store';
import { CreateUserCommand } from '../create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  public constructor(
    private readonly userStore: UserStore,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: CreateUserCommand): Promise<any> {
    Logger.log('Async CreateUserHandler', 'CreateUserCommand');
    const { createUserDTO } = command;
    const user = await this.userStore.create(createUserDTO);

    const userAggregate = this.publisher.mergeObjectContext(
      await new UserAggregate(user.id),
    );
    userAggregate.registerProduct(createUserDTO);
    userAggregate.commit();

    return user;
  }
}
