import { Module } from '@nestjs/common';
import { MulterExtendedModule } from 'nestjs-multer-extended';
import { RestaurantsController } from './controllers/restaurants.controller';
import { ConfigService } from 'nestjs-config';

@Module({
  imports: [
    MulterExtendedModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('s3'),
      inject: [ConfigService],
    }),
  ],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
