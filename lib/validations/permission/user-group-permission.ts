import { z } from "zod";

export type SchemaUserGroupPermissioin = z.infer<
  typeof schemaUserGroupPermissioin
>;
export const schemaUserGroupPermissioin = z.object({
  name: z.string().min(3),
  permissions: z.array(z.coerce.number()).min(1),
});
