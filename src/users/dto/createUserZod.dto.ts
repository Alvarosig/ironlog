import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(2, 'mínimo 2 caracteres')
      .max(15, 'máximo 15 caracteres'),
    email: z.string().email('insira um email válido'),
    password: z
      .string()
      .min(6, 'a senha deve conter no mínimo 6 caracteres')
      .max(12, 'a senha deve conter no máximo 12 caracteres'),
  })
  .required();

export type CreateUserZodDTO = z.infer<typeof createUserSchema>;
