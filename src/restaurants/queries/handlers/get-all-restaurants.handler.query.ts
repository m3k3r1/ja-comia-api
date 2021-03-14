import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RestaurantStore } from 'src/restaurants/store/restaurant.store';
import { GetAllRestaurantsQuery } from '../get-all-restaurants.query';

@QueryHandler(GetAllRestaurantsQuery)
export class GetAllRestaurantsHandlerQuery
  implements IQueryHandler<GetAllRestaurantsQuery> {
  public constructor(private readonly restaurantStore: RestaurantStore) {}

  public async execute() {
    return await this.restaurantStore.findAll();
  }
}
