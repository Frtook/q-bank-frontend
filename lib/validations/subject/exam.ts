import { z } from "zod";

export type TExam = z.infer<typeof schemaExam>;

export const schemaExam = z.object({
  name: z.string(),
  confirmed: z.boolean(),
  questions: z.array(z.number()), // array of question IDs
  setting: z.object({
    marks: z.number(),
    subject: z.number(), // subject ID
    periodOfTime: z.string(),
    generation_config: z.string(),
    level: z.number(),
    academy: z.number(), // academy ID
  }),
});
