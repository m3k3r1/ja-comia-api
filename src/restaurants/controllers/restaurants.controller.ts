import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  UsePipes,
  ValidationPipe,
  Body,
  ParseUUIDPipe,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import CreateRestaurantDTO from '../dtos/create-restaurant.dto';
import Restaurant from '../entities/restaurant.entity';
import { RestaurantsService } from '../services/restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  public constructor(private readonly restaurantsService: RestaurantsService) {}

  @Patch(':id/logo')
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      dynamicPath: ['restaurant', 'id'],
      resizeMultiple: [
        { suffix: 'sm', width: 200, height: 200 },
        { suffix: 'md', width: 300, height: 300 },
        { suffix: 'lg', width: 400, height: 400 },
      ],
    }),
  )
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Get()
  public getAll(): Promise<Restaurant[]> {
    return this.restaurantsService.getAll();
  }

  @Get(':id')
  public getById(@Param('id', ParseUUIDPipe) id: string): Promise<Restaurant> {
    return this.restaurantsService.getById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  public create(
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<Restaurant> {
    return this.restaurantsService.create(createRestaurantDTO);
  }

  @Delete(':id')
  public delete(): Promise<void> {
    return this.restaurantsService.delete();
  }
}
