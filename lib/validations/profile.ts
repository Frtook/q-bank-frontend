import { z } from "zod";

export type TschemaProfile = z.infer<typeof schemaProfile>;

export const schemaProfile = z.object({
  fullname: z.string(),
  username: z.string(),
  email: z.string().email().optional(),
});
