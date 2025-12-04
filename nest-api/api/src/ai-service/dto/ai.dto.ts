import { ApiProperty } from '@nestjs/swagger';

export class ImageUploadBody {
  @ApiProperty({ required: true, format: 'binary', description: 'Image file' })
  image!: 'multipart/form-data';
}
