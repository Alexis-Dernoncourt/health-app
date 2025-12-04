import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  ValidateNested,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateRecipeDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(254)
  @IsOptional()
  title?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  description?: string;

  @ApiProperty({
    required: false,
    format: 'binary',
    description: 'Image file',
  })
  @IsOptional()
  image?: 'multipart/form-data';

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @ValidateNested()
  ingredients?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  @ValidateNested()
  steps?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  calories?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  prep_time?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  cook_time?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  servings?: string;
}
