import { Logger } from '@nestjs/common';
import CreateUserDTO from '../dtos/create-task.dto';

export class UserWasCreatedEvent {
  public constructor(public readonly createUserDTO: CreateUserDTO) {
    Logger.log('UserWasAddedEvent called');
  }
}
