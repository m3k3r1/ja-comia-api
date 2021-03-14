import { Logger } from '@nestjs/common';
import Restaurant from '../entities/restaurant.entity';

export class RestaurantWasUpdatedEvent {
  public constructor(public readonly restaurant: Restaurant) {
    Logger.log('RestaurantWasUpdatedEvent called');
  }
}
