import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';
import { QueriesHandlers } from './queries/handlers';
import { UserStore } from './store/user.store';
import { CommandHandlers } from './commands/handler';
import BCryptHashProvider from './providers/HashProvider/implementations/bcrypt-hash.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('jwt'),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    ...QueriesHandlers,
    ...CommandHandlers,
    AuthService,
    UsersService,
    UserStore,
    BCryptHashProvider,
    JwtStrategy,
  ],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
