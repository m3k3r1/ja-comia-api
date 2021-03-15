import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-config';
import BCryptHashProvider from 'src/users/providers/HashProvider/implementations/bcrypt-hash.provider';
import { UserRepository } from 'src/users/repositories/user.repository';
import { AuthResponseDTO } from '../dtos/auth-response.dto';
import { AuthDTO } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly hashProvider: BCryptHashProvider,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  public async authenticateUser({
    email,
    password,
  }: AuthDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email/passsword combination');
    }

    const passwordMatched = await this.hashProvider.comparesHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Incorrect email/passsword combination');
    }

    const token = await this.jwtService.sign(
      {},
      {
        subject: user.id,
        expiresIn: this.config.get('jwt').signOptions.expiresIn,
      },
    );

    return {
      user,
      token,
    };
  }
}
