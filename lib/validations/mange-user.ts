import { z } from "zod";

export type SchemaUser = z.infer<typeof schemaUser>;
export const schemaUser = z.object({
  username: z.string(),
  is_activ: z.boolean(),
  email: z.string().email(),
  fullname: z.string(),
});
