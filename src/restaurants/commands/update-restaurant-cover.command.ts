import { UploadImageDTO } from '../dtos/upload-image.dto';

export class UpdateRestaurantCoverCommand {
  public constructor(public readonly uploadImageDTO: UploadImageDTO) {}
}
