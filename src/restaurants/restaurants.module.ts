import { Module } from '@nestjs/common';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { RestaurantsController } from './controllers/restaurants.controller';
import { ConfigService } from 'nestjs-config';
import { RestaurantsService } from './services/restaurants.service';
import { RestaurantRepository } from './repositories/restaurant.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueriesHandlers } from './queries/handlers';
import { RestaurantStore } from './store/restaurant.store';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([RestaurantRepository]),
    MulterExtendedModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('s3'),
      inject: [ConfigService],
    }),
  ],
  controllers: [RestaurantsController],
  providers: [...QueriesHandlers, RestaurantStore, RestaurantsService],
})
export class RestaurantsModule {}
