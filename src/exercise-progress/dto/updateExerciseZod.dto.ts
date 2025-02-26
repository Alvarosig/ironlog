import { z } from 'zod';

export const updateExerciseProgressSchema = z
  .object({
    reps: z.number().max(100, 'máximo 100 reps').optional(),
    weight: z.number().max(1000, 'máximo 1t').optional(),
  })
  .partial();

export type UpdateExerciseProgressZodDTO = z.infer<
  typeof updateExerciseProgressSchema
>;
