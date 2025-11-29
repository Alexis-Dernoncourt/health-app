// import { z } from 'zod';
// export const createRecipeSchema = z
//   .object({
//     title: z.string().min(1).max(254),
//     description: z.string().min(3),
//     image: z.string().optional(),
//     ingredients: z
//       .array(
//         z.object({ name: z.string(), quantity: z.string(), unit: z.string() }),
//       )
//       .optional(),
//     steps: z
//       .array(
//         z.object({
//           number: z.number(),
//           text: z.string(),
//           warning: z.string().optional(),
//         }),
//       )
//       .optional(),
//     calories: z
//       .object({
//         for100gr: z.number().positive(),
//         total: z.number().positive(),
//         totalWeight: z.number().positive(),
//         caloriesUnit: z.string().min(1).max(32),
//       })
//       .optional(),
//   })
//   .required();
// export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
// export type UpdateRecipeDto = Partial<CreateRecipeDto>;

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  ValidateNested,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(254)
  title!: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MinLength(3)
  description!: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;

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
    description: 'Calories pour 100gr (ex: 125kcal / 100gr)',
  })
  @IsOptional()
  @ValidateNested()
  @IsOptional()
  @IsString()
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
