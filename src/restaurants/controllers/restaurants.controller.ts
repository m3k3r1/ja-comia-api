import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';

@Controller('restaurants')
export class RestaurantsController {
  @Post('logo')
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      dynamicPath: 'restaurants',
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
}
