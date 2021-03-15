import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  login(@Body() authDTO: AuthDTO) {
    return this.authService.authenticateUser(authDTO);
  }
}
