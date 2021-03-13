import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { PaymentsModule } from './payments/payments.module';
import { EventStoreModule } from './core/event-store/event-store.module';

@Module({
  imports: [
    EventStoreModule.forRoot(),
    TypeOrmModule.forRoot(),
    UsersModule,
    OrdersModule,
    RestaurantsModule,
    KitchenModule,
    PaymentsModule,
  ],
})
export class AppModule {}
