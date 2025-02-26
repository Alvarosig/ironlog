import { z } from 'zod';

export const createProgressSchema = z
  .object({
    reps: z.number().max(100, 'máximo 100 reps'),
    weight: z.number().max(1000, 'máximo 1t'),
  })
  .required();

export type CreateProgressZodDTO = z.infer<typeof createProgressSchema>;
