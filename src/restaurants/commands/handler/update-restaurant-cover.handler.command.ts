import { Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RestaurantAggregate } from 'src/restaurants/aggregates/restaurant.aggregate';
import { RestaurantStore } from 'src/restaurants/store/restaurant.store';
import { UpdateRestaurantCoverCommand } from '../update-restaurant-cover.command';

@CommandHandler(UpdateRestaurantCoverCommand)
export class UpdateRestaurantCoverCommandHandler
  implements ICommandHandler<UpdateRestaurantCoverCommand> {
  public constructor(
    private readonly restaurantStore: RestaurantStore,
    private readonly publisher: EventPublisher,
  ) {}

  public async execute(command: UpdateRestaurantCoverCommand): Promise<any> {
    Logger.log(
      'Async UpdateRestaurantCoverHandler',
      'UpdateRestaurantCoverCommand',
    );

    const { uploadImageDTO } = command;

    const restaurant = await this.restaurantStore.findOne(
      uploadImageDTO.restaurant_id,
    );

    if (!restaurant) {
      throw new NotFoundException();
    }

    restaurant.coverSm = uploadImageDTO.sm;
    restaurant.coverMd = uploadImageDTO.md;
    restaurant.coverLg = uploadImageDTO.lg;

    await this.restaurantStore.save(restaurant);

    const restaurantAggregate = this.publisher.mergeObjectContext(
      await new RestaurantAggregate(restaurant.id),
    );
    restaurantAggregate.updatedRestaurant(restaurant);
    restaurantAggregate.commit();

    return restaurant;
  }
}
