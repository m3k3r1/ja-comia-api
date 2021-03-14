import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import Restaurant from 'src/restaurants/entities/restaurant.entity';
import { RestaurantStore } from 'src/restaurants/store/restaurant.store';
import { GetRestaurantByIdQuery } from '../get-restaurant-by-id.query';

@QueryHandler(GetRestaurantByIdQuery)
export class GetRestaurantByIdHandlerQuery
  implements IQueryHandler<GetRestaurantByIdQuery> {
  public constructor(private readonly restaurantStore: RestaurantStore) {}

  public async execute(query: GetRestaurantByIdQuery): Promise<Restaurant> {
    const { id } = query;
    const restaurant = await this.restaurantStore.findOne(id);
    if (!restaurant) {
      throw new NotFoundException();
    }
    return restaurant;
  }
}
