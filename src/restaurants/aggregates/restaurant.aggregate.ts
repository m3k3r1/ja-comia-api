import { AggregateRoot } from '@nestjs/cqrs';
import CreateRestaurantDTO from '../dtos/create-restaurant.dto';
import Restaurant from '../entities/restaurant.entity';
import { RestaurantWasCreatedEvent } from '../events/restaurant-was-created.event';
import { RestaurantWasUpdatedEvent } from '../events/restaurant-was-updated.event';

export class RestaurantAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  public registerRestaurant(createRestaurantDTO: CreateRestaurantDTO) {
    this.apply(new RestaurantWasCreatedEvent(createRestaurantDTO));
  }

  public updatedRestaurant(restaurant: Restaurant) {
    this.apply(new RestaurantWasUpdatedEvent(restaurant));
  }
}
