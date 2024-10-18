import { z } from 'zod';
import { SigninSchema } from 'src/auth/dto/auth-signin.dto';

export type CreateUserDto = z.infer<typeof SigninSchema>;
