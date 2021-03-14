import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Restaurant from '../entities/restaurant.entity';
import { RestaurantRepository } from '../repositories/restaurant.repository';

@Injectable()
export class RestaurantStore {
  constructor(
    @InjectRepository(RestaurantRepository)
    private restaurantsRepository: RestaurantRepository,
  ) {}

  public async findAll(): Promise<Restaurant[]> {
    return await this.restaurantsRepository.find();
  }
  public async findOne(id: string): Promise<Restaurant> {
    return await this.restaurantsRepository.findOne(id);
  }
}
