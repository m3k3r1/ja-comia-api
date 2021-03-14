import { EntityRepository, Repository } from 'typeorm';
import Restaurant from '../entities/restaurant.entity';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {}
