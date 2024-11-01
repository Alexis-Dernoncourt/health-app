import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'firstname must be a string' })
  @Length(1, 128)
  firstname?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ message: 'lastname must be a string' })
  @Length(1, 128)
  lastname?: string;

  @ApiProperty({
    required: false,
    example: 'exemple@mail.com',
    description: 'Email address',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  //   @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image?: string;
}

export class ImageUploadBody {
  @ApiProperty({ required: true, format: 'binary', description: 'Image file' })
  image!: 'multipart/form-data';
}
