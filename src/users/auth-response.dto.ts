import User from 'src/users/entities/user.entity';

export interface AuthResponseDTO {
  user: User;
  token: string;
}
