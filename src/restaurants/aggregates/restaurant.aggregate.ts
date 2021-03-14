import { AggregateRoot } from '@nestjs/cqrs';
import CreateRestaurantDTO from '../dtos/create-restaurant.dto';
import { RestaurantWasCreatedEvent } from '../events/restaurant-was-created.event';

export class RestaurantAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  public registerProduct(createRestaurantDTO: CreateRestaurantDTO) {
    this.apply(new RestaurantWasCreatedEvent(createRestaurantDTO));
  }
}
