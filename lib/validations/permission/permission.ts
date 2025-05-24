import { z } from "zod";

export type TPermission = z.infer<typeof schemaPermission>;

export const schemaPermission = z.object({
  object_pk: z.string(),
  user: z.number(),
  permission: z.number(),
});
