import { z } from "zod";

export type TTopic = z.infer<typeof schemaTopic>;

export const schemaTopic = z.object({
  name: z.string(),
  subject: z.number().optional(),
  outcomes: z.array(z.number()),
});
