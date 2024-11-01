import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    required: true,
    example: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    description: 'Recipe ID',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  recipe!: string;

  @ApiProperty({
    required: true,
    enum: $Enums.mealType,
  })
  @IsNotEmpty()
  @IsEnum($Enums.mealType)
  meal!: $Enums.mealType;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsDate()
  date!: Date;
}

export class UpdateMenuDto {
  @ApiProperty({
    required: false,
    example: 'breakfast',
    description: 'Meal type',
    enum: $Enums.mealType,
  })
  @IsEnum($Enums.mealType)
  @IsOptional()
  meal?: $Enums.mealType;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsDate()
  date?: Date;
}
