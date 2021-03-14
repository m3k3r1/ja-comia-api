import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateRestaurantDTO from '../dtos/create-restaurant.dto';
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

  public async create(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.create(
      createRestaurantDTO,
    );
    await this.restaurantsRepository.save(restaurant);
    return restaurant;
  }

  public async save(user: Restaurant): Promise<Restaurant> {
    return this.restaurantsRepository.save(user);
  }

  async findByEmail(email: string): Promise<Restaurant | undefined> {
    const user = await this.restaurantsRepository.findOne({
      where: { email },
    });

    return user;
  }
}
