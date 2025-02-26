import { z } from 'zod';

export const updateProgressSchema = z
  .object({
    reps: z.number().max(100, 'máximo 100 reps').optional(),
    weight: z.number().max(1000, 'máximo 1t').optional(),
  })
  .partial();

export type UpdateProgressZodDTO = z.infer<typeof updateProgressSchema>;
