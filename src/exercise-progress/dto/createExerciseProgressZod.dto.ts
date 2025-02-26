import { z } from 'zod';

export const createExerciseProgressSchema = z
  .object({
    reps: z.number().max(100, 'máximo 100 reps'),
    weight: z.number().max(1000, 'máximo 1t'),
  })
  .required();

export type CreateExerciseProgressZodDTO = z.infer<
  typeof createExerciseProgressSchema
>;
