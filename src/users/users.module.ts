import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { QueriesHandlers } from './queries/handlers';
import { UserStore } from './store/user.store';
import { CommandHandlers } from './commands/handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [...QueriesHandlers, ...CommandHandlers, UsersService, UserStore],
})
export class UsersModule {}
