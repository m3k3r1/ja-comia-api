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
import { UploadImageDTO } from '../dtos/upload-image.dto';
import Restaurant from '../entities/restaurant.entity';
import { RestaurantsService } from '../services/restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  public constructor(private readonly restaurantsService: RestaurantsService) {}

  @Patch(':id/logo')
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      dynamicPath: ['restaurants', 'id', 'logo'],
      resizeMultiple: [
        { suffix: 'sm', width: 200, height: 200 },
        { suffix: 'md', width: 300, height: 300 },
        { suffix: 'lg', width: 400, height: 400 },
      ],
    }),
  )
  changeLogo(@UploadedFile() file, @Param('id', ParseUUIDPipe) id: string) {
    const uploadImageDTO: UploadImageDTO = {
      restaurant_id: id,
      sm: file.sm.Location,
      md: file.md.Location,
      lg: file.lg.Location,
    };
    return this.restaurantsService.changeLogo(uploadImageDTO);
  }

  @Patch(':id/cover')
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      dynamicPath: ['restaurants', 'id', 'cover'],
      resizeMultiple: [
        { suffix: 'sm', width: 200, height: 200 },
        { suffix: 'md', width: 300, height: 300 },
        { suffix: 'lg', width: 400, height: 400 },
      ],
    }),
  )
  changeCover(
    @UploadedFile() file,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Restaurant> {
    const uploadImageDTO: UploadImageDTO = {
      restaurant_id: id,
      sm: file.sm.Location,
      md: file.md.Location,
      lg: file.lg.Location,
    };
    return this.restaurantsService.changeCover(uploadImageDTO);
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
