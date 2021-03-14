import { Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RestaurantAggregate } from 'src/restaurants/aggregates/restaurant.aggregate';
import { RestaurantStore } from 'src/restaurants/store/restaurant.store';
import { UpdateRestaurantLogoCommand } from '../update-restaurant-logo.command';

@CommandHandler(UpdateRestaurantLogoCommand)
export class UpdateRestaurantLogoCommandHandler
  implements ICommandHandler<UpdateRestaurantLogoCommand> {
  public constructor(
    private readonly restaurantStore: RestaurantStore,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: UpdateRestaurantLogoCommand): Promise<any> {
    Logger.log(
      'Async UpdateRestaurantLogoHandler',
      'UpdateRestaurantLogoCommand',
    );

    const { uploadImageDTO } = command;

    const restaurant = await this.restaurantStore.findOne(
      uploadImageDTO.restaurant_id,
    );

    if (!restaurant) {
      throw new NotFoundException();
    }

    restaurant.logoSm = uploadImageDTO.sm;
    restaurant.logoMd = uploadImageDTO.md;
    restaurant.logoLg = uploadImageDTO.lg;

    await this.restaurantStore.save(restaurant);

    const restaurantAggregate = this.publisher.mergeObjectContext(
      await new RestaurantAggregate(restaurant.id),
    );
    restaurantAggregate.updatedRestaurant(restaurant);
    restaurantAggregate.commit();

    return restaurant;
  }
}
