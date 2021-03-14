import { Logger } from '@nestjs/common';
import CreateRestaurantDTO from '../dtos/create-restaurant.dto';

export class RestaurantWasCreatedEvent {
  public constructor(public readonly createRestaurantDTO: CreateRestaurantDTO) {
    Logger.log('RestaurantWasAddedEvent called');
  }
}
