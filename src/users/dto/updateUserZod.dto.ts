import { z } from 'zod';

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(2, 'mínimo 2 caracteres')
      .max(15, 'máximo 15 caracteres')
      .optional(),

    email: z.string().email('insira um email válido').optional(),

    password: z
      .string()
      .min(6, 'a senha deve conter no mínimo 6 caracteres')
      .max(12, 'a senha deve conter no máximo 12 caracteres')
      .optional(),
  })
  .partial();

export type UpdateUserZodDTO = z.infer<typeof updateUserSchema>;
