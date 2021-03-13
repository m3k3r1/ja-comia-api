import CreateUserDTO from '../dtos/create-task.dto';

export class CreateUserCommand {
  public constructor(public readonly createUserDTO: CreateUserDTO) {}
}
