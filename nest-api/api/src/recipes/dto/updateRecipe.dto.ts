import { ApiProperty } from '@nestjs/swagger';
import {
  validate,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsPositive,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ImageUploadBody } from 'src/users/dto/user.dto';

export class Ingredient {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  quantity?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  unit?: string;
}

export class Step {
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  number?: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  warning?: string;
}

export class Calories {
  [key: string]: any;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  for100gr?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  total?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  totalWeight?: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  @IsOptional()
  caloriesUnit?: string;
}

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
    type: [Ingredient],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  ingredients?: Ingredient[];

  @ApiProperty({
    required: false,
    type: [Step],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  steps?: Step[];

  @ApiProperty({
    required: false,
    type: [Calories],
  })
  @IsOptional()
  @ValidateNested()
  calories?: Calories;
}
