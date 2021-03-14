import { UploadImageDTO } from '../dtos/upload-image.dto';

export class UpdateRestaurantLogoCommand {
  public constructor(public readonly uploadImageDTO: UploadImageDTO) {}
}
