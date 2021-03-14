import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { PaymentsModule } from './payments/payments.module';
import { RestaurantItemsModule } from './restaurant-items/restaurant-items.module';
import { ConfigModule } from 'nestjs-config';
import { OrderHistoryModule } from './order-history/order-history.module';
import { RestaurantSectionsModule } from './restaurant-sections/restaurant-sections.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRoot(),
    UsersModule,
    OrdersModule,
    RestaurantsModule,
    KitchenModule,
    PaymentsModule,
    RestaurantItemsModule,
    OrderHistoryModule,
    RestaurantSectionsModule,
  ],
})
export class AppModule {}
