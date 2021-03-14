import { ConflictException, Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RestaurantAggregate } from 'src/restaurants/aggregates/restaurant.aggregate';
import { RestaurantStore } from 'src/restaurants/store/restaurant.store';
import { CreateRestaurantCommand } from '../create-restaurant.command';

@CommandHandler(CreateRestaurantCommand)
export class CreateRestaurantCommandHandler
  implements ICommandHandler<CreateRestaurantCommand> {
  public constructor(
    private readonly restaurantStore: RestaurantStore,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: CreateRestaurantCommand): Promise<any> {
    Logger.log('Async CreateRestaurantHandler', 'CreateRestaurantCommand');

    const { createRestaurantDTO } = command;

    const restaurantExists = await this.restaurantStore.findByEmail(
      createRestaurantDTO.email,
    );

    if (restaurantExists) {
      throw new ConflictException();
    }
    const restaurant = await this.restaurantStore.create(createRestaurantDTO);

    const restaurantAggregate = this.publisher.mergeObjectContext(
      await new RestaurantAggregate(restaurant.id),
    );
    restaurantAggregate.registerProduct(createRestaurantDTO);
    restaurantAggregate.commit();

    return restaurant;
  }
}
