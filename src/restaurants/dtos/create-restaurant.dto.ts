import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateRestaurantDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;
}
