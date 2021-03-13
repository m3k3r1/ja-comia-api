import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
