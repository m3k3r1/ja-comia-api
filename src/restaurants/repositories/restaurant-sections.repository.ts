import { EntityRepository, Repository } from 'typeorm';
import RestaurantSections from '../entities/restaurant-sections.entity';

@EntityRepository(RestaurantSections)
export class RestaurantSectionsRepository extends Repository<RestaurantSections> {}
