import { z } from 'zod';

export const MenuSchema = z
  .object({
    recipe: z.string(),
    meal: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']),
    date: z.date(),
  })
  .required();

export type CreateMenuDto = z.infer<typeof MenuSchema>;
export type UpdateMenuDto = Partial<Pick<CreateMenuDto, 'meal'>> &
  Pick<CreateMenuDto, 'date'>;
