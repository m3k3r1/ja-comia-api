import { CreateRestaurantCommandHandler } from './create-restaurant.handler.command';
import { UpdateRestaurantCoverCommandHandler } from './update-restaurant-cover.handler.command';
import { UpdateRestaurantLogoCommandHandler } from './update-restaurant-logo.handler.command';

export const CommandHandlers = [
  CreateRestaurantCommandHandler,
  UpdateRestaurantCoverCommandHandler,
  UpdateRestaurantLogoCommandHandler,
];
