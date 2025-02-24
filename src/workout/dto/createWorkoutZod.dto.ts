import { z } from 'zod';

export const createWorkoutSchema = z
  .object({
    name: z
      .string()
      .min(2, 'mínimo 2 caracteres')
      .max(15, 'máximo 15 caracteres'),
    description: z.string().max(50).optional(),
  })
  .required();

export type CreateWorkoutZodDTO = z.infer<typeof createWorkoutSchema>;
