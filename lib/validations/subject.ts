import { z } from "zod";

export type TschemaSubject = z.infer<typeof schemaSubject>;

export const schemaSubject = z.object({
  name: z.string(),
  academy: z.number(),
});
