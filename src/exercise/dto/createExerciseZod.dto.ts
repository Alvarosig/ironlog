import { z } from 'zod';

export const createExerciseSchema = z
  .object({
    name: z
      .string()
      .min(2, 'mínimo 2 caracteres')
      .max(80, 'máximo 80 caracteres'),
    muscleGroup: z
      .string()
      .min(3, 'mínimo 3 caracteres')
      .max(10, 'máximo 10 caracteres'),
  })
  .required();

export type CreateExerciseZodDTO = z.infer<typeof createExerciseSchema>;
