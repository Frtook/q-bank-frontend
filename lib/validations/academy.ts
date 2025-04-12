import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "../constants";

export type Academy = z.infer<typeof AcademySchema>;

export const AcademySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  logo: z
    .instanceof(File, { message: "select one image" })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only these types are allowed .jpg, .jpeg, .png and .webp"
    )
    .refine((file) => file.size < 200000, "size Image must be less than 2MB ")
    .optional(),
  active: z.boolean(),
});
