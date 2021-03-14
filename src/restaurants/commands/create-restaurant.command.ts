import CreateRestaurantDTO from '../dtos/create-restaurant.dto';

export class CreateRestaurantCommand {
  public constructor(
    public readonly createRestaurantDTO: CreateRestaurantDTO,
  ) {}
}
