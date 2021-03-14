import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import CreateRestaurantDTO from '../dtos/create-restaurant.dto';
import Restaurant from '../entities/restaurant.entity';
import { GetAllRestaurantsQuery } from '../queries/get-all-restaurants.query';
import { GetRestaurantByIdQuery } from '../queries/get-restaurant-by-id.query';

@Injectable()
export class RestaurantsService {
  public constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  public async getAll(): Promise<Restaurant[]> {
    return this.queryBus.execute(new GetAllRestaurantsQuery());
  }
  public async getById(id: string): Promise<Restaurant> {
    return this.queryBus.execute(new GetRestaurantByIdQuery(id));
  }
  public async create(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<Restaurant> {
    console.log(createRestaurantDTO);
    return null;
  }
  public async delete(): Promise<void> {
    return null;
  }
}
