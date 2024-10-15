import { z } from 'zod';
export const createRecipeSchema = z
  .object({
    title: z.string().min(1).max(254),
    description: z.string().min(3),
    image: z.string().optional(),
    ingredients: z
      .array(
        z.object({ name: z.string(), quantity: z.string(), unit: z.string() }),
      )
      .optional(),
    steps: z
      .array(
        z.object({
          number: z.number(),
          text: z.string(),
          warning: z.string().optional(),
        }),
      )
      .optional(),
    calories: z
      .object({
        for100gr: z.number().positive(),
        total: z.number().positive(),
        totalWeight: z.number().positive(),
        caloriesUnit: z.string().min(1).max(32),
      })
      .optional(),
  })
  .required();

export type CreateRecipeDto = z.infer<typeof createRecipeSchema>;
