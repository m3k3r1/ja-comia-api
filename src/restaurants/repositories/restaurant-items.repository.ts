import { EntityRepository, Repository } from 'typeorm';
import RestaurantItems from '../entities/restaurant-items.entity';

@EntityRepository(RestaurantItems)
export class RestaurantSectionsRepository extends Repository<RestaurantItems> {}
