import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    OrdersModule,
    RestaurantsModule,
    KitchenModule,
    PaymentsModule,
  ],
})
export class AppModule {}
