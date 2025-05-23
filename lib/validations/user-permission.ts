import { z } from "zod";

export type SchemaUserPermission = z.infer<typeof schemaUserPermission>;
export const schemaUserPermission = z.object({
  username: z.string(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
  fullname: z.string(),
});
