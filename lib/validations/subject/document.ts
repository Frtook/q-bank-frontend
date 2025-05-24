import { z } from "zod";
export type TDocment = z.infer<typeof DocmentSchema>;

export const DocmentSchema = z.object({
  name: z.string().min(3),
  file: z.instanceof(File),
  subject: z.number(),
});
