import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDTO from '../dtos/create-task.dto';
import User from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserStore {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  public async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  public async create(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(createUserDTO);
    await this.userRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }
}
