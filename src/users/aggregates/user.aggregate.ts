import { AggregateRoot } from '@nestjs/cqrs';
import CreateUserDTO from '../dtos/create-task.dto';
import { UserWasCreatedEvent } from '../events/user-was-created.event';

export class UserAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  public registerProduct(createUserDTO: CreateUserDTO) {
    this.apply(new UserWasCreatedEvent(createUserDTO));
  }
}
