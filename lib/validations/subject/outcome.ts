import { z } from "zod";

export type TOutcome = z.infer<typeof schemaOutcome>;

export const schemaOutcome = z.object({
  text: z.string(),
  subject: z.number().optional(),
});
