import { z } from 'zod';

export const updateWorkoutSchema = z
  .object({
    name: z
      .string()
      .min(2, 'mínimo 2 caracteres')
      .max(15, 'máximo 15 caracteres')
      .optional(),
    description: z.string().max(50).optional(),
  })
  .partial();

export type UpdateWorkoutZodDTO = z.infer<typeof updateWorkoutSchema>;
