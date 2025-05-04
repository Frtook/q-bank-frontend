import { z } from "zod";

export type TQuestion = z.infer<typeof schemaQuestion>;

export const schemaQuestion = z.object({
  text: z.string(),
  hint: z.string().optional(),
  image: z
    .union([
      z
        .string()
        .refine(
          (img) => img.startsWith("data:image/"),
          "Please select a valid base64 image"
        ),
      z
        .string()
        .refine(
          (img) => img.startsWith("https://api.q-bank.tech/image/"),
          "Please select a valid image URL"
        ),
      z.null(),
    ])
    .optional(),
  answers: z
    .array(
      z.object({
        text: z.string(),
        isPerfectAns: z.boolean(),
      })
    )
    .refine(
      (answers) => answers.some((answer) => answer.isPerfectAns),
      "Select one answer"
    ),
  setting: z.object({
    active: z.boolean(),
    periodOfTime: z.string(),
    type: z.number(),
    level: z.number(),
    rondomnizable: z.boolean(),
    topic: z.number(),
  }),
});
