import { z } from 'zod';

export const updateExerciseSchema = z
  .object({
    name: z
      .string()
      .min(2, 'mínimo 2 caracteres')
      .max(80, 'máximo 80 caracteres')
      .optional(),

    muscleGroup: z
      .string()
      .min(3, 'mínimo 3 caracteres')
      .max(10, 'máximo 10 caracteres')
      .optional(),
  })
  .partial();

export type UpdateExerciseZodDTO = z.infer<typeof updateExerciseSchema>;
