import { z } from "zod";

export type TschemaLogin = z.infer<typeof schemaLogin>;

export const schemaLogin = z.object({
  username: z.string().min(3).toLowerCase(),
  password: z.string().min(8),
});
