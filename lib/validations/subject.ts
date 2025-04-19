import { z } from "zod";

export type SchemaSubject = z.infer<typeof schemaSubject>;
export const schemaSubject = z.object({
  name: z.string().min(3),
  academy: z.number(),
});
