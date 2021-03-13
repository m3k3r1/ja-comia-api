import { ConflictException, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserAggregate } from 'src/users/aggregates/user.aggregate';
import BCryptHashProvider from 'src/users/providers/HashProvider/implementations/bcrypt-hash.provider';
import { UserStore } from 'src/users/store/user.store';
import { CreateUserCommand } from '../create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand> {
  public constructor(
    private readonly userStore: UserStore,
    private readonly publisher: EventPublisher,
    private readonly hashProvider: BCryptHashProvider,
  ) {}

  public async execute(command: CreateUserCommand): Promise<any> {
    Logger.log('Async CreateUserHandler', 'CreateUserCommand');
    const { createUserDTO } = command;

    const userExists = await this.userStore.findByEmail(createUserDTO.email);

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await this.hashProvider.generateHash(
      createUserDTO.password,
    );
    createUserDTO.password = hashedPassword;
    const user = await this.userStore.create(createUserDTO);

    const userAggregate = this.publisher.mergeObjectContext(
      await new UserAggregate(user.id),
    );
    userAggregate.registerProduct(createUserDTO);
    userAggregate.commit();

    return user;
  }
}
