import { z } from 'zod';

export const SigninSchema = z
  .object({
    firstname: z.string().min(1).max(128),
    lastname: z.string().min(1).max(128).optional(),
    email: z.string().email(),
    password: z.string().min(8).max(128),
  })
  .required();

export type SigninDto = z.infer<typeof SigninSchema>;
