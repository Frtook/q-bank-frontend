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
      z.string().nullable(),
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
      "Select The True answer"
    )
    .refine(
      (answers) => answers.every((answer) => answer.text.trim() !== ""),
      "Select The Text answer"
    ),
  setting: z.object({
    active: z.boolean(),
    periodOfTime: z.coerce.number(),
    type: z.number(),
    level: z.number(),
    rondomnizable: z.boolean(),
    topic: z.number(),
  }),
});
