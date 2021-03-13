import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDTO from '../dtos/create-task.dto';
import User from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserStore {
  constructor(
    @InjectRepository(UserRepository)
    private taskRepository: UserRepository,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.taskRepository.find();
  }
  public async findOne(id: string): Promise<User> {
    return await this.taskRepository.findOne(id);
  }

  public async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.taskRepository.create(createUserDTO);
    await this.taskRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.taskRepository.save(user);
  }
}
