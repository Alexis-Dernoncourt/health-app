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
  validate,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsPositive,
  MinLength,
  MaxLength,
  IsJSON,
} from 'class-validator';

export class Ingredient {
  @ApiProperty({
    required: true,
  })
  @IsString()
  name!: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  quantity!: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  unit!: string;
}

export class Step {
  @ApiProperty({
    required: true,
  })
  @IsNumber()
  number!: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  text!: string;

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
  for100gr?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsPositive()
  total?: number;

  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsPositive()
  totalWeight?: number;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  caloriesUnit?: string;
}

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
    type: Calories,
  })
  @IsOptional()
  @ValidateNested()
  @IsJSON()
  calories?: Calories;

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
